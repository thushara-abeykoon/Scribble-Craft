class FontTemplate:
    def __init__(self, font_name, font_family, font_weight, font_style):
        self.font_name = font_name
        self.font_family = font_family
        self.font_weight = font_weight
        self.font_style = font_style
        self.svg_header = f'''<svg xmlns='http://www.w3.org/2000/svg'><defs>
                            <font id="{self.font_name}" horiz-adv-x="0">'''
        self.svg_footer = '''</font></defs></svg>'''
        self.font_header = f'''<font-face   font-family="{self.font_family}"
                                            font-weight="{self.font_weight}"
                                            font-style="{self.font_style}"
                                            font-stretch="normal"
                                            units-per-em="2048"
                                            panose-1="2 0 5 0 0 0 0 9 0 0"
                                            ascent="1638"
                                            descent="-410"
                                            x-height="552"
                                            cap-height="1480"
                                            bbox="-3014 -939 9165 1783"
                                            underline-thickness="150"
                                            underline-position="-292"
                                            unicode-range="U+001D-FB04" />
                                            '''
        self.font = None

    def create_font(self, glyphs: list):
        self.font = self.svg_header + self.font_header

        for glyph in glyphs:
            self.font += glyph + "\n\t\t\t\t\t\t\t\t\t\t\t"

        self.font += self.svg_footer

    def get_font(self):
        return self.font
