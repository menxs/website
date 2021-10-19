defmodule Erlef.Repo.Migrations.CreatePostMedia do
  use Ecto.Migration

  def change do
    create table(:post_media) do 
      add :post_id, references(:blog_posts, on_delete: :delete_all)
      add :media_id, references(:blog_media, on_delete: :delete_all)
    end

    create unique_index("post_media", [:post_id, :media_id])
  end
end