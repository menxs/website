defmodule Erlef.Blog.PostMedia do
  @moduledoc """
  Erlef.Blog.PostMedia schema
  """

  use Erlef.Schema

  alias Erlef.Blog.{Post, Media}

  schema "post_media" do
    belongs_to(:post_id, Post, on_replace: :delete)
    belongs_to(:media_id, Media, on_replace: :delete)
    timestamps()
  end

  @required_fields [:post_id, :media_id]

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, @required_fields)
    |> validate_required(@required_fields)
    |> foreign_key_constraint(:post_id)
    |> foreign_key_constraint(:media_id)
  end
end
