module SmartAsJson extend ActiveSupport::Concern
  def as_json options={}
    only_fields = options[:only].present? ? options[:only] : attribute_names
    only_fields = only_fields.map &:to_sym
    if defined? self.class::SENSITIVE_ATTRIBUTES
      only_fields -= self.class::SENSITIVE_ATTRIBUTES.map &:to_sym
    end

    allowed_methods = options[:methods] || []

    allowed_methods = allowed_methods.map &:to_sym
    if defined? self.class::ALLOWED_METHODS
      allowed_methods &= self.class::ALLOWED_METHODS.map &:to_sym
    else
      allowed_methods = []
    end

    json = {}
    method_params = options[:method_params] || {}
    methods = allowed_methods & method_params.keys
    methods.each do |method|
      if method_params.key? method.to_sym
        json[method] = send method, *method_params[method]
      end
    end

    include_methods = allowed_methods - (methods)

    includes = options[:include] || {}
    includes.each do |relation, relation_options|
      json[relation] = self.send(relation).as_json relation_options
    end

    super(only: only_fields,
      methods: include_methods,
      except: options[:except],
    ).merge({
      created_at: "#{I18n.l created_at, format: '%Y-%m-%d %H:%M'}",
      updated_at: "#{I18n.l updated_at, format: '%Y-%m-%d %H:%M'}",
    }).merge json
  end
end
