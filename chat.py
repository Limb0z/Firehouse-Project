filename = "chat.csv"


def get_chat():
    full_chat = []
    with open(filename) as file:
        for line in file:
            full_chat.append({"message": line.rstrip("\n\r")})
    return full_chat


def add_message(name, message):
    with open(filename, "a") as file:
        file.write("<b class=\"name\">" + name + "</b>: ")
        file.write(message + "\n")