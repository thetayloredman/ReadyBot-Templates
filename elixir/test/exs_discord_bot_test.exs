defmodule ExsDiscordBotTest do
  use ExUnit.Case
  doctest ExsDiscordBot

  test "greets the world" do
    assert ExsDiscordBot.hello() == :world
  end
end
