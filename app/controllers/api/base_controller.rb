class Api::BaseController < ActionController::Base
  # include Devise::Controllers::SignInOut
  # before_action :authenticate_user!
  # protect_from_forgery with: :exception

  # load_and_authorize_resource

  # rescue_from ::ActiveRecord::RecordNotFound, with: :record_not_found
  # rescue_from CanCan::AccessDenied do |exception|
  #   response_fail exception.message, 401
  # end

  def response_success data = nil
    render json: {
      data: data,
      status: true,
      server: ENV["SERVER_IDENTITY"],
    }
  end

  def response_fail data = nil, status_code = 200
    render json: {
      data: data,
      status: false,
      server: ENV["SERVER_IDENTITY"],
    }, status: status_code
  end

  def record_not_found
    response_fail
  end

  def base_index_response table_name, options = {}
    response = {}
    has_more = false
    model_name = table_name.classify.constantize

    results = params[:search_query] ? model_name.search_by_query(params[:search_query])
      : model_name.all

    results = params[:includes] ? results.includes(params[:includes]) : results

    order = params[:order_by] || "id desc"

    results = results.order order
    results = filter_by results, params[:filter]

    as_json_params = generate_as_json_params options
    if params[:include]
      eager_load_include = ConvertJsonService.convert_to_eager_load_include as_json_params[:include]
      results = results.includes eager_load_include
    end

    response[:count] = results.count if params[:count]
    if params[:take].present?
      take = params[:take].to_i
      results = results.take(take + 1)
      has_more = results.size > take ? true : false
      results = results[0..-2] if has_more
    end
    response[:has_more] = has_more

    response[table_name.underscore.to_sym] = results.as_json as_json_params
    response
  end

  def generate_as_json_params options = {}
    as_json_params = {}
    if params[:include]
      as_json_params[:include] = JSON.parse(params[:include]).deep_symbolize_keys
    end

    if params[:methods]
      as_json_params[:methods] = params[:methods]
      as_json_params[:method_params] = options[:method_params]
    end
    as_json_params[:only] = params[:only] if params[:only]

    as_json_params
  end

  def filter_by objects, filter
    filter_list = filter || {}
    filter_list.each do |key, value|
      filter_key = "filter_by_" + key.to_s
      if objects.respond_to? filter_key
        objects = objects.send filter_key, value
      else
        if objects.attribute_names.include?(key.to_s) && value.present?
          objects = objects.where("#{objects.model_name.plural}.#{key} = ?", value)
        end
      end
    end
    objects
  end

  def get_response table_name, objects = nil
    responseJson = {
      data: base_index_response(table_name, objects),
      status: true,
      server: ENV["SERVER_IDENTITY"],
    }

    Oj.dump responseJson, mode: :compat
  end

  def fetch_index_response table_name, objects = nil
    if params[:include].present? || params[:search_query].present?
      return get_response table_name, objects
    end

    begin
      redis_key = params
      response = $redis.hget table_name, redis_key

      if response.nil?
        response = get_response table_name, objects
        $redis.hset table_name, redis_key, response
      end
    rescue => error
      puts error.inspect
      response = get_response table_name, objects
    end
    response
  end

  def company_params
    current_user.company ? {
      company_id: current_user.company_id,
    } : {}
  end

  def field_params
    {
      field_id: session[:field_id],
    }
  end

  def end_session
    sign_out current_user
    response_fail nil, 401
  end

  def userstamp_params
    if action_name == "create"
      {creator_id: current_user.id}
    elsif action_name == "update"
      {updater_id: current_user.id}
    end
  end

  private
  def check_valid_field
    if (current_user.manager? || current_user.member?) && current_user.team.field_id.nil?
      end_session
      return false
    end
  end

  def filter_by_company
    params[:filter] ||= {}
    params[:filter] = params[:filter].merge company_params
  end

  def filter_by_field
    params[:filter] ||= {}
    params[:filter] = field_params.merge params[:filter].to_unsafe_h
  end
end
