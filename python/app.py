from nextcord.ext import commands

bot = commands.Bot(command_prefix='!')

@bot.command(name="ping")
async def SendMessage(ctx):
    await ctx.send("Pong!")
    
@bot.event
async def on_ready():
    print("Bot is ready!")
    
if __name__ == '__main__':
    bot.run("Pass in your bot token here")
