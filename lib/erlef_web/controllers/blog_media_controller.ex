defmodule ErlefWeb.BlogMediaController do
  use ErlefWeb, :controller
  action_fallback ErlefWeb.FallbackController

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
