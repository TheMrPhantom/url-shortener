import sqlite3
import os
from sqlite3.dbapi2 import Row


class SQLiteWrapper:
    def __init__(self):
        self.db_name = os.environ.get("db_name") if os.environ.get(
            "db_name") else "database.db"
        self.__create_tables()

    def __create_tables(self):
        try:
            con = sqlite3.connect(self.db_name)
            con.cursor().execute(
                '''CREATE TABLE links
                (shortname TEXT, url TEXT, clicks INTEGER)'''
            )
            con.commit()
            con.close()
        except sqlite3.OperationalError as e:
            print(e)

    def store_links(self, shortname, url):
        con = sqlite3.connect(self.db_name)
        con.cursor().execute('''INSERT INTO links values (?, ?, 0)''',
                             (shortname, url))

        con.commit()
        con.close()

    def load_links(self):
        con = sqlite3.connect(self.db_name)
        output = list()
        for link in con.cursor().execute('''SELECT rowid as id, * FROM links '''):
            output.append(link)
        con.close()
        return output

    def load_and_increment_link(self, shortname):
        con = sqlite3.connect(self.db_name)
        output = ""
        for link in con.cursor().execute('''SELECT rowid, url, clicks FROM links WHERE shortname=?;''', (shortname,)):
            output = link
        rowid=output[0]
        url=output[1]
        clicks = output[2]
        clicks += 1

        con.cursor().execute('''UPDATE links SET clicks=? WHERE ROWID=?''', (clicks,rowid,))
        con.commit()
        con.close()

        return url

    def remove_links(self, id):
        con = sqlite3.connect(self.db_name)
        con.cursor().execute('''DELETE FROM links WHERE ROWID=?;''', (id,))
        con.commit()
        con.close()

    def test_db(self):
        self.store_links("aaa", [["test", "https://test.de"]])
        self.load_links("aaa")
