defmodule Erlef.Blog.Media do
  @moduledoc """
  Erlef.Blog.Media schema
  """
  use Erlef.Schema

  schema "blog_media" do
    field(:category, :string)
    field(:hashsum, :integer)
    field(:url, :string)
    belongs_to(:owner, Erlef.Accounts.Member)

    many_to_many(:used_in, Erlef.Blog.Post,
      join_through: Erlef.Blog.PostMedia,
      on_replace: :delete
    )

    timestamps()
  end

  @doc false
  def changeset(image, attrs) do
    image
    |> cast(attrs, [:hashsum, :url, :category])
    |> validate_required([:hashsum, :url, :category])
  end
end
