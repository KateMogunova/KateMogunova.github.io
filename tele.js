var TelegramBot = require( "node-telegram-bot-api" );

#const token = '345930993:AAFwJQpXPGYmDr7VBaQJQ3fGA42VTUNwiR0';

var bot = new TelegramBot("345930993:AAFwJQpXPGYmDr7VBaQJQ3fGA42VTUNwiR0", {polling: true});


bot.onText( /\/start/, function( msg ) 
	{

	  bot.sendMessage(
	      msg.from.id,
	      "Hi <b>" + msg.from.first_name + "</> " + msg.from.last_name + "\nLet's play Bible Battles games!",
	      {
	          parse_mode: "HTML"
	     });
	} );

bot.onText( /\/play (.+)/, function( msg, match ) 
	{
		var fromId = msg.from.id;
		  switch( match[1] ) {
		      case "biblebattles":
		          bot.sendGame(
		              fromId,
		              "biblebattles",
		              {
		                  reply_markup: JSON.stringify({
		                      inline_keyboard: [
		                          [ { text: "Play", callback_game: JSON.stringify( { game_short_name: "biblebattles" } ) } ],
		                          [ { text: "Share", url: "https://telegram.me/CannewBot?game=biblebattles" } ]
		                      ]
		                  })
		              }
		          );
		          break;
		      default:
		          bot.sendMessage( fromId, "Sorry " + msg.from.first_name + ", but this game doesn’t exist.." );
		  }
} );

bot.on( "callback_query", function( cq ) 
{
	  if ( cq.game_short_name ) 
	  {	
	  	switch( cq.game_short_name ) 
	  	{
	          case "biblebattles":
	              bot.answerCallbackQuery( cq.id, undefined, false, { url: "https://katemogunova.github.io" } );
	              return;
	      }
	      bot.answerCallbackQuery( cq.id, "Sorry, '" + cq.game_short_name + "' is not available.", true );
	  }
} );

bot.on( "inline_query", function( iq ) {

  bot.answerInlineQuery( iq.id, [ { type: "game", id: "0", game_short_name: "biblebattles" } ] );

} );
