module Search extend ActiveSupport::Concern
  module ClassMethods
    def search_follow_field query, fields
      like_query = query || ""
      like_query = "%#{sanitize_sql_like like_query.strip}%"
      objects = self.name.constantize.all

      query_build = ""
      fields.each do |key, value|
        case value
        when "eq"
          query_build += " #{key} = :q OR"
        when "like"
          query_build += " #{key} LIKE :like_q OR"
        end
      end
      query_build = query_build.chomp(" OR")

      sql_query = sanitize_sql_array [query_build, q: query, like_q: like_query]
      objects = objects.where sql_query
    end
  end
end
