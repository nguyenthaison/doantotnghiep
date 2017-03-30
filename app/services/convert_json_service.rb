class ConvertJsonService
  class << self
    def convert_to_eager_load_include hash
      return hash unless hash.is_a? Hash

      converted_hash = {}
      hash.each do |key, value|
        if (hash[key][:include])
          converted_hash[key] = convert_to_eager_load_include hash[key][:include]
        else
          converted_hash[key] = {}
        end
      end

      converted_hash
    end
  end
end
