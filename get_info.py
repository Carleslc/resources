#!/usr/bin/python3
# -*- coding: utf-8 -*-

import re
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
THUMBNAIL_URL = "https://api.thumbnail.ws/api/abd0c3864495e337e453a3795c676a9ead164b1b3030/thumbnail/get"
SPLIT_CHARS = "-:."

def set_args():
    global args
    parser = argparse.ArgumentParser()
    parser.add_argument("url", help="website URL")
    parser.add_argument("--display", action='store_true', help="set if you want to show website og:image")
    parser.add_argument("--add", action='store_true', help="open the resource list form to add this website")
    parser.add_argument("--colorless", action='store_true', help="set for non-color console displays")
    args = parser.parse_args()

def print_colored(message, *colors):
    def printnoln(s):
        print(s, end='', flush=True)
    if args.colorless:
        print(message)
    else:
        for color in colors:
            printnoln(color)
        print(message)
        if not args.colorless:
            printnoln(Style.RESET_ALL)

def print_meta(og_tag, *colors):
    prop = html.find("meta", property=f"og:{og_tag}")
    if prop is not None:
        prop = prop["content"]
        print_colored(prop, *colors)
    else:
        print_colored(f"No og:{og_tag} provided", Fore.RED)
    return prop

def get_source(url):
    try:
        source = get(args.url, headers={'User-Agent': 'Mozilla/5.0'})
        source.raise_for_status()
    except Exception as e:
        print_colored(e, Style.BRIGHT, Fore.RED)
        exit(1)
    return BeautifulSoup(source.content, 'html.parser')

def get_url(url, params):
    return url + '?' + urlencode(params)

def thumbnail(url):
    return get_url(THUMBNAIL_URL, { 'url': url, 'width': 1080 })

def copy_display(image_url):
    pyperclip.copy(image_url)
    print_colored('Image URL copied to clipboard!', Style.DIM)
    if args.display:
        Image.open(get(image_url, stream=True).raw).show()

def add_resource(title, link, description):
    params = { 'prefill_Link': link }
    if title is not None:
        params['prefill_Title'] = title
    if description is not None:
        params['prefill_Description'] = description
    url = get_url(RESOURCES_URL, params)
    webbrowser.open(url)

def strip_title(title):
    if title is not None:
        return re.split(f"[{SPLIT_CHARS}]+", title)[0].strip()

if __name__ == "__main__":
    set_args()

    global html
    html = get_source(args.url)
    #print_colored(html.prettify(), Style.DIM)
    
    url = print_meta("url", Style.DIM) or args.url
    site_name = print_meta("site_name", Style.BRIGHT)
    title = html.find("title").string.strip()
    print(title)
    print_meta("title", Fore.GREEN)
    description = print_meta("description", Fore.CYAN)
    image = print_meta("image", Fore.YELLOW)
    copy_display(image or thumbnail(url))

    if args.add:
        add_resource(site_name or strip_title(title), url, description)