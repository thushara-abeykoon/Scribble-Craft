import svgpathtools


def glyph_creator(glyph_name, unicode, data, horizontal_space):
    if type(data) is not list:
        return f'<glyph glyph-name="{glyph_name}" unicode="{unicode}" d="{data}" horiz-adv-x="{horizontal_space}" />'
    else:
        return f'<glyph glyph-name="{glyph_name}" unicode="{unicode}" horiz-adv-x="{horizontal_space}>{list(map(lambda x: "<path d=" + x + "/>", data))}</glyph>'


def get_max_width(path):
    path = svgpathtools.parse_path(path)
    bounding_boxes = [subpath.bbox() for subpath in path]

    _, max_width, _, _ = max(box for box in bounding_boxes)

    return max_width
