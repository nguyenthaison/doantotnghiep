class CreateFavoriteArticles < ActiveRecord::Migration[5.0]
  def change
    create_table :favorite_articles do |t|
      t.references :user, index: true, foreign: true
      t.references :article, polymorphic: true, index: true
      t.timestamps
    end
  end
end
