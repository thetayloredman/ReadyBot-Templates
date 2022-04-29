#include "sleepy_discord\sleepy_discord.h"

class ClientClass : public SleepyDiscord::DiscordClient {
public:
  using SleepyDiscord::DiscordClient::DiscordClient;
  void onReady(SleepyDiscord::ReadyEvent event) override {
    std::cout << "Bot is ready!" << std::endl;
  }

  void onMessage(SleepyDiscord::Message message) override {
    if (message.startsWith("!ping")) {
      sendMessage(message.channelID, "Pong!");
    }
  }
};

int main() {
  ClientClass client("Your bot token here!", SleepyDiscord::USER_CONTROLED_THREADS);
  client.setIntents(SleepyDiscord::Intents::GUILDS | SleepyDiscord::Intents::GUILD_MESSAGES);
  client.run();
}