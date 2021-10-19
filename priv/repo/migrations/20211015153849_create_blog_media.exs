defmodule Erlef.Repo.Migrations.CreateBlogMedia do
  use Ecto.Migration

  def change do
    create table(:blog_media) do
      add :hashsum, :integer
      add :url, :string
      add :category, :string
      add :uploaded_by, references(:members, on_delete: :nothing)

      timestamps()
    end

    create index(:blog_media, [:uploaded_by])
  end
end
