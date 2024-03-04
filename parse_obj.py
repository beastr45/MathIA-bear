import sys


def parse_obj(filename):
    vertices = []
    indices = []
    with open(filename, 'r') as obj_file:
        for line in obj_file:
        # split line into words
            words = line.split()

            if len(words) > 0:
            # check for vertex line
                if words[0] == 'v':
                    vertex = [float(words[1]),float(words[2]),float(words[3])]
                    vertices.append(vertex)
                if words[0] == 'f':
                    index = []
                    for word in words:
                        first_slash_index = word.find('/')
                        if first_slash_index != -1:
                            index.append(int(word[:first_slash_index]))
                    indices.append(index)
    return vertices, indices

def format_vertices(vertices):
    formatted_vertices = []

    for vertex in vertices:
        formatted_vertex = f"({vertex[0]}, {vertex[1]}, {vertex[2]})"
        formatted_vertices.append(formatted_vertex)

    return formatted_vertices

def print_data(vertices, indices, option):
    if option == 'i':
        index_data = []
        for index in indices:
            index_data.append(f"{index[0]},{index[1]},{index[2]}")

        index_data= ', '.join(index_data)
        print("i_{indices} = [" + f"{index_data}"+"]")
    if option == 'v':
        x_val = []
        y_val = []
        z_val = []
        for vertex in vertices:
            x_val.append(vertex[0])
            y_val.append(vertex[1])
            z_val.append(vertex[2])

        print("x_{values} = " + f"{x_val}")
        print("y_{values} = " + f"{y_val}")
        print("z_{values} = " + f"{z_val}")
    if option == 'a':
        print(vertices)
        print("\n")
        print("\n")
        print("\n")
        print("\n")
        print(indices)

def main():
    file = sys.argv[1]
    option = input("v or i (a)?")
    vertices,indices = parse_obj(file)
    print_data(vertices, indices, option)
    # print(format_vertices(vertices))


if __name__ == "__main__":
    main()
