defmodule ExsDiscordBot.Application do
  use Application
  alias Alchemy.Client

  defp load_modules do
    use ExsDiscordBot.Commands
  end

  @impl true
  def start(_type, _args) do
    children = []

    Client.start(Application.get_env(:exs_discord_bot, :token))
    load_modules()

    opts = [strategy: :one_for_one, name: ExsDiscordBot.Supervisor]
    Supervisor.start_link(children, opts)
  end
end