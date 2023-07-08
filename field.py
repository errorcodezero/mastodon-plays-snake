from random import randint


class Field():
    def __init__(self, size):
        self.size = size
        self.icons = {
            # Empty space
            0: '⬜',
            # Snake tail
            1: '🟨',
            # Snake head
            2: '😳',
            # Apple
            3: '🍎'
        }
        self.snake_coords = []
        self._generate()
        self.randomly_add()

    def _generate(self):
        self.field = [[0 for j in range(self.size)] for i in range(self.size)]

    def _clear(self):
        self.field = [[j if j != 1 and j != 2 else 0 for j in i]
                      for i in self.field]

    def render(self):
        size = self.size
        # self._clear()

        for i, j in self.snake_coords:
            self.field[i][j] = 1

        head = self.snake_coords[-1]
        self.field[head[0]][head[1]] = 2

        rendered_field = ""

        for i in range(size):
            row = ''
            for j in range(size):
                row += self.icons[self.field[i][j]]
            rendered_field += row + "\n"

        return rendered_field

    def randomly_add(self):
        i = randint(0, self.size-1)
        j = randint(0, self.size-1)
        coords = [i, j]

        while (True):
            if coords not in self.snake_coords:
                self.field[i][j] = 3
                break

    def get_entity_pos(self):
        for i in range(self.size):
            for j in range(self.size):
                if self.field[i][j] == 3:
                    return [i, j]

        return [-1, -1]

    def is_snake_eat_entity(self):
        entity = self.get_entity_pos()
        head = self.snake_coords[-1]
        return entity == head
