class Snake:
    def __init__(self):
        self.direction = "right"

        # Init basic coords
        self.coords = [[1, 1]]

    def set_direction(self, ch, direction):
        match ch:
            case "reblog":
                if (direction == "right"):
                    self.direction = "up"
                elif (direction == "up"):
                    self.direction = "left"
                elif (direction == "left"):
                    self.direction = "down"
                elif (direction == "down"):
                    self.direction == "right"
            case "favorite":
                if (direction == "right"):
                    self.direction = "down"
                elif (direction == "down"):
                    self.direction = "left"
                elif (direction == "left"):
                    self.direction = "up"
                elif (direction == "up"):
                    self.direction == "right"
            case "reply":
                self.direction = direction

    def level_up(self):
        # get last point direction
        a = self.coords[0]
        b = self.coords[1]

        tail = a[:]

        if a[0] < b[0]:
            tail[0] -= 1
        elif a[1] < b[1]:
            tail[1] -= 1
        elif a[0] > b[0]:
            tail[0] += 1
        elif a[1] > b[1]:
            tail[1] += 1

        tail = self._check_limit(tail)
        self.coords.insert(0, tail)

    def is_alive(self):
        head = self.coords[-1]
        snake_body = self.coords[:-1]
        return head not in snake_body

    def _check_limit(self, point):
        # Check field limit
        if point[0] > self.field.size-1:
            point[0] = 0
        elif point[0] < 0:
            point[0] = self.field.size-1
        elif point[1] < 0:
            point[1] = self.field.size-1
        elif point[1] > self.field.size-1:
            point[1] = 0

        return point

    def move(self):
        head = self.coords[-1][:]

        if self.direction == "up":
            head[0] -= 1
        elif self.direction == "down":
            head[0] += 1
        elif self.direction == "right":
            head[1] += 1
        elif self.direction == "left":
            head[1] -= 1

        # Check field limit
        head = self._check_limit(head)

        del (self.coords[0])
        self.coords.append(head)
        self.field.snake_coords = self.coords

        if not self.is_alive():
            pass

        if self.field.is_snake_eat_entity():
            self.level_up()
            self.field.add_entity()

    def set_field(self, field):
        self.field = field
