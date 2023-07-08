from mastodon import Mastodon
from dotenv import load_dotenv
from os import getenv
import field
import snake
from random import randint
import time

# Load environment variables
load_dotenv()

url = getenv("URL")
email = getenv("EMAIL")
password = getenv("PASSWORD")
client_key = getenv("CLIENT_KEY")
client_secret = getenv("CLIENT_SECRET")
access_token = getenv("ACCESS_TOKEN")

mastodon = Mastodon(client_id=client_key, client_secret=client_secret,
                    access_token=access_token, api_base_url=url)
mastodon.log_in(
    email,
    password,
    to_file='pytooter_usercred.secret',
)

user = mastodon.account_lookup("@mastodonplayssnake@techhub.social")


def main():
    gameField = field.Field(6)
    gameSnake = snake.Snake()
    gameSnake.set_field(gameField)

    directions = ["up", "down", "left", "right"]
    direction = directions[randint(0, 3)]

    while (True):
        ch = ""
        last_status = mastodon.account_statuses(user['id'], limit=1)
        replies_count = last_status[0]['replies_count']
        favorites_count = last_status[0]['favourites_count']
        reblogs_count = last_status[0]['reblogs_count']
        if replies_count > favorites_count and replies_count > reblogs_count:
            ch = "reblog"
        elif favorites_count > replies_count and favorites_count > reblogs_count:
            ch = "favorite"
        directions = ["up", "down", "left", "right"]
        direction = directions[randint(0, 3)]
        gameSnake.set_direction(ch, direction)
        gameSnake.move()
        print(favorites_count)
        print(replies_count)
        print(reblogs_count)
        mastodon.toot(gameField.render())
        time.sleep(15)


if __name__ == "__main__":
    main()
