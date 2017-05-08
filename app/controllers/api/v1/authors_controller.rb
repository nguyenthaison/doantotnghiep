class Api::V1::AuthorsController < Api::BaseController
  def index
    response_success base_index_response "authors"
  end

  def create
    if @author.save
      response_success author: @author
    else
      response_fail @author.errors
    end
  end

  def show
    response_success author: @author
  end

  def update
    @author.update_attributes author_params
    response_success author: @author
  end

  def destroy
    if @author.destroy
      response_success
    else
      response_fail author: @author
    end
  end

  private
  def author_params
    numberDay = (Time.zone.now.to_date - params[:author][:dob].to_date).to_i
    age = (numberDay / 365).to_i
    age = {age: age}
    params.require(:author).permit(Author::ATTRIBUTES_PARAMS).merge(age)
  end
end
