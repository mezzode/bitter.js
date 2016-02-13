#!python
import os, sys, sqlite3, bcrypt

users_dir = './dataset-medium/users'
bleats_dir = './dataset-medium/bleats'
conn = sqlite3.connect('bitter.db')
c = conn.cursor()

all_keys = ['username', 'password', 'full_name', 'email', 'home_suburb', 'home_latitude', 'home_longitude']

c.execute("CREATE TABLE users (%s);" % ",".join(all_keys))
c.execute("CREATE TABLE listens (username, listen);")

for user in os.listdir(users_dir):
    keys = []
    values = []
    listens = []
    with open(os.path.join(users_dir,user,"details.txt")) as f:
        for line in f:
            field, _, value = line.rstrip().partition(": ")
            if field == 'listens':
                listens = value.split(' ')
                continue
            if field == 'password':
                value = bcrypt.hashpw(value, bcrypt.gensalt(prefix=b'2a'))
            keys.append(field)
            values.append(value)
    insert_str = "INSERT INTO users (%s) values (%s);" % (",".join(keys),",".join(['?']*len(keys)))
    c.execute(insert_str, values)

    for listen in listens:
        c.execute("INSERT INTO listens (username, listen) values (?,?);", (user, listen))

all_keys = ['username', 'bleat', 'time', 'latitude', 'longitude', 'in_reply_to']
c.execute("CREATE TABLE bleats (%s,id PRIMARY KEY);" % ",".join(all_keys))
for bleat in os.listdir(bleats_dir):
    keys = []
    values = []
    listens = []
    with open(os.path.join(bleats_dir,bleat)) as f:
        for line in f:
            field, _, value = line.rstrip().partition(": ")
            keys.append(field)
            values.append(value)
        keys.append('id')
        values.append(bleat)
    insert_str = "INSERT INTO bleats (%s) values (%s);" % (",".join(keys),",".join(['?']*len(keys)))
    c.execute(insert_str, values)

conn.commit()
