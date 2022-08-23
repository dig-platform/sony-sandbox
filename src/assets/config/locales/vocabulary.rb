# frozen_string_literal: true

{
  :en => {
    :vocabulary => VocabularyService.get_all_vocabularies_mapped.each_with_object({}) do |(key, vocabs), obj|
      obj[key.to_sym] = vocabs.map(&:as_json)
    end
  }
}
