#!/usr/bin/python3
# -*- coding: utf-8 -*-

import json
import argparse
from requests import get
from bs4 import BeautifulSoup
from colorama import Fore, Style, init
from PIL import Image

def set_args():
    global args
    parser = argparse.ArgumentParser()
    parser.add_argument("url", help="website URL")
    args = parser.parse_args()

def print_colored(message, *colors):
    def printnoln(s):
        print(s, end='', flush=True)
    for color in colors:
        printnoln(color)
    print(message)
    printnoln(Style.RESET_ALL)

def print_meta(og_tag, *colors):
    prop = html.find("meta", property=f"og:{og_tag}")
    if prop:
        prop = prop["content"]
        print_colored(prop, *colors)
    else:
        print_colored(f"No og:{og_tag} provided", Fore.RED)
    return prop

def get_source(url):
    try:
        source = get(args.url)
        source.raise_for_status()
    except:
        print_colored(f"Connection Error, check that {url} is accessible", Style.BRIGHT, Fore.RED)
        exit(1)
    return BeautifulSoup(source.content, 'html.parser')

if __name__ == "__main__":
    set_args()

    global html
    html = get_source(args.url)
    #print_colored(html.prettify(), Style.DIM)
    
    print_meta("url", Style.DIM)
    print(html.find("title").string)
    print_meta("title", Fore.GREEN)
    print_meta("description", Fore.CYAN)
    image = print_meta("image", Fore.YELLOW)
    if image:
        Image.open(get(image, stream=True).raw).show()