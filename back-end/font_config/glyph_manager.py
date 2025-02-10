import svgpathtools


def glyph_creator(glyph_name, unicode, data, horizontal_space):
    return f'<glyph glyph-name="{glyph_name}" unicode="{unicode}" d="{"".join(map(str, data))}" horiz-adv-x="{horizontal_space}" />'
    # if len(data) == 1:
    #     return f'<glyph glyph-name="{glyph_name}" unicode="{unicode}" d="{data[0]}" horiz-adv-x="{horizontal_space}" />'
    # else:
    #     return f'<glyph glyph-name="{glyph_name}" unicode="{unicode}" horiz-adv-x="{horizontal_space}">' + ''.join(
    #         map(lambda x: f'<path d="{x}"/>', data)) + '</glyph>'


def get_max_width(path):
    path = svgpathtools.parse_path(path)
    bounding_boxes = [subpath.bbox() for subpath in path]

    _, max_width, _, _ = max(box for box in bounding_boxes)

    return max_width


def get_paths(svg_path):
    paths, attributes = svgpathtools.svg2paths(svg_path)

    paths_data = []
    for path in paths:
        paths_data.append(path.d())

    return paths_data



