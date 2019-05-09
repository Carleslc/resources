#!/usr/bin/python3
# -*- coding: utf-8 -*-

import json
import argparse
import pyperclip
import webbrowser
from requests import get
from bs4 import BeautifulSoup
from urllib.parse import urlencode
from colorama import Fore, Style, init
from PIL import Image

RESOURCES_URL = "https://airtable.com/shrnzLIolsKJMD9Ql"

def set_args():
    global args
    parser = argparse.ArgumentParser()
    parser.add_argument("url", help="website URL")
    parser.add_argument("--display", action='store_true', help="set if you want to show website og:image")
    parser.add_argument("--add", action='store_true', help="open the resource list form to add this website")
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

def get_url(url, params):
    return url + '?' + urlencode(params)

def copy_display(image_url):
    pyperclip.copy(image_url)
    print_colored('Image URL copied to clipboard!', Style.DIM)
    if args.display:
        Image.open(get(image_url, stream=True).raw).show()

def add_resource(title, link, description):
    params = {
        'prefill_Title': title,
        'prefill_Link': link,
        'prefill_Description': description
    }
    url = get_url(RESOURCES_URL, params)
    webbrowser.open(url)

if __name__ == "__main__":
    set_args()

    global html
    html = get_source(args.url)
    #print_colored(html.prettify(), Style.DIM)
    
    url = print_meta("url", Style.DIM)
    site_name = print_meta("site_name", Style.BRIGHT)
    title = print(html.find("title").string)
    print_meta("title", Fore.GREEN)
    description = print_meta("description", Fore.CYAN)
    image = print_meta("image", Fore.YELLOW)
    if image:
        copy_display(image)

    if args.add:
        add_resource(site_name or title, url or args.url, description)