"""Self-contained incremental UI upgrade for Company Knowledge Search.

Run this file from the root of an existing installation with:

    py upgrade_v3.py

This upgrade only replaces ``app.py``. It deliberately leaves all retrieval,
parser, SQLite/FTS5, configuration, log, index, and source-document files in
place. The script itself uses only the Python standard library and supports
Windows Python 3.14.
"""

from __future__ import annotations

import base64
import importlib
import importlib.util
import os
import py_compile
import shutil
import sys
import zlib
from datetime import datetime
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parent

# zlib-compressed, base64-encoded UTF-8 bytes of the complete UI runtime.
FILES = {
    "app.py": "eNrFfWuXG0WW4Pf6FTnpwymJTqmk1LNUVp0B22x7Gz8ONszsGI46JYWqskvK1Gam6tG1dY5pMBhssHsbmwE80HSDcQMGpoGxx68+Z/5Kl1RVn/gLe29EZGZEKvUy3l3b5VJGRtyIe+PGfcWNkKqqR+xO17C2lF9Z9kabNFeIcoYYTmN13lXOeA4xOm3TU7oOcYnlGZ5pW0rb2CJOem6O1dMU02qSTdNa0ZSu4bjsA4EPrkesBtEUw2oqR+yu2bY9ZcWxe1YT6iiuZ2xB07lf/9p1Ggu//nVaObtqukrHbvbaRLGt9pbfq6t4q7ZLFOjE9WhT4qybDeIqbbthtNtb6TlVVefmWo7dUWq1Vs/rOaRWU8xO13Y86N6y2cjduTletup12v7n37i25X9u2ysr0IP/aLv+J7dX7zo29BmWbLmsx67hrbbNut/daXgM+nEDChouPAwVpxtAfdtCJNPrWawUFnCEgDpQy2qZK34PJ57559qRX7548le1M8f/5ZimnDh+Unp+pts9QhtogI/RrDX4g2usE/4ggqYTUwPsOl3P76LeM9vYUHwXtmkanlE3YEZ47UYbOKEGM6HB8C2LNDxNWSFeDabYc5E/TM802uZvSc1trJKOEUJq2U7H8OikclhN4hlmu9aBX7W2aQH7NO1GrwMEqXlbXVJrG3UC/bCGNRgJ8cwO1AJW6bW9sF3Yh8+eSjBxVqPm2j2nQWotu90kTliXz3/NJV6vG6BHSYY85bNHUB+4lbRdvyJbEC/QkYR1XFoa1Dl5/PTpY2drJ5554Ve1YyePanLJmbPPvHBW45CeM9seLCSYRmD8mkQHKGRw5+aGhpdIzuEn4ihVn6HTMB3P07KEanS7anLu6LHnnnnx+bO1I6dOH3/+1NnamWPPHzty9vgpYKVTL548C00Lc3OuB6OH+TdWfMZJ0M+e6bVJVd375PP92/86uHqj/90lVUO5YPe8qrphNokaTHvNhcc68AdyAzRq2O220XVJEwaBHXQMZ61pb1iJOQX+4ELG34ddb6tNlunnimOD5NhWUinTWqscyjbhb2sJHjs9jzQrh4qkSEo5LIBVCgOrHCqTMlmkJcgKFWelbiSKGQ3/lbR0NpfEV/V2D6pmMiWjRaEhZpVDrTr8bS4pO7RrlBNa3W5uaecabcN1n4bxu676ipZ2PVhmWr3nebalmVa352ke2fQMWNiaS9qwBmDELdvyUi2jY7a3Kimge5ukQGx4pKM9CwNbO2E0ztDH56Cepp55Tjnt2MpZAKMGT0dNtwuEhYLTMI/PGcDHZ4/A0y9Jex1Yv2EoJ0mPYH2yYhPlxeOq5hqWmwIZabb+gTGdYXkSQmzwML660VhjErmChDKc1IpjNE1gskQ2V2iSFe1Qq9Qqtwwl8xR8bLWUvI4fKI2UbCbzVNIHfOiEYVoniNXTWjBbxNHOoZRIeQREdrOqut5Z224DGwDtom/OAGP03H8yQfd48NoF2oGwHqrF2Cim/VHSsB0q4NVXAKkmo1jFAjEaQwBiwIqPgvglLaXNV4m5supVMkLTjmmlYooF6nkO0By0H1BuuMtoZ0D7l0yyATIaRJ1Fu4VVYFpKug4KbS3V8F8MYYo0fhbriG23lY6xmYJF561Gce4aTdS10qj5oJCpFc4I/xe7iYJ+iTjItG0KHtcRLBUUaiHS0NGK0a1klkAwgOiCDwCKwlp4Wnmm4fWMtgJLSbGMdXOFzrqmgIIHG4EodcfeAMZXGqsgfEE9WbTUIS3ioCmSVp5eoJDSnt1NAQDoq2u7JgKpwAgba1tL8Aa6/G2Kao1KIbPEJ75Y7G4u1e3NlGv+FnGt2w5wTApKlnyGa7XJ5hLouRUrZcKidisNQIw4S7/pAezWFkURSirAKA2SqhNvgxArJJ6il6ELhjXABcHSqWRpryGfUUmmFwqa/5MugTALxsLadDcV126bTWXdcBJMBCYpkKYDaLeoUqmA9HMSut7dTIJdAAYTyOZEtlCABZ3aIPU100tN34LPdbruoKm3DQqzbTsV1juIueQSlYNAOFLRYXRLOCJ/QWXZyw1O5UxmqU086C6FVEK6pNKZXIF0ljZWgai0lAD/bThGN+gXZhKxXHOF1T9qMpC3ckhov38QYkOAAhwOFbLwt7yEoj3VDOQMXQACVtl8BCvKLSJiBUBsCgzSBsi+dTKShj6ZChmpqbEOqwxXDlueuWyIH/3MmapNWl4lxRiZcgwK+54Lg3tqyV4nTqttb1RWzWYT2JLVEJiJsl5Gw7/pbFJkykOk1Gw1jbgRuesrwpxQ8bbExkjpLs8BbQgG4roDToaPCyWtXy8fxYUuGT5Veh7+FkVpcWwTyKnourKgFPA/vQjmpbsGS1xxV0m7HcoD10utkS1U0Sn6RlmGQa8PaQnbMX+LcsoXX76sEuSeyHJo5nuN1YAwvBdme4K9YRGqi1khteZSG7azRjkkeMGNcFYdpXCojECONhJAvPVVJaUgyyVHSKgxA0ARyCUQsoqi5+A/XCBMHA3JnnxR0/MlkD3ABuVMIHscNkHTi55sWRYk+YmiJ7ZFFLMIFQXs9AzHiWI3Xqjq5akQi3QenSmJroyki/hfNrZ7XWM/OZDp+v8botGBptAiQvcIFTzTuEpGyeWDhRUrx7OFiIBDkTQsubMouWFlc46LduWrLKQLrcZMv5ghjR1LPjqWWC2SpUMJTQmwIVAjO3YbnKkmSQXRDoDZDETDkBkLmuA4mvsvgJl7jBkvIAiovECLOlZsCr5HMSlakJIYhqmKty6HGbRcTs5m0sUPW5u9SYjpzOMb2QFAZR5UtMbJXqdOHKnOE6VxlKliyZ9itZ4UkpUK6MIGWaWRh9DQKNfLjUVdgGcj53pblazUxxTwW3aj5wZkEkef0bK6zs1GXaYRaI1VA9xwuvhh+QNto02y+ZHoYjAIpBCMh3q+ApcI2ioX4e//HytFQDTePYyS91nq4ANCzNOPYJQPTKmxeAyP3rdZcnoul1ucYOEXZeOvAJKW+pvMbwnbKulswdXEaaclU6JWWUUTEMjiJSpgsBn1Nmkm5XWOEYClYbYKcUW9OV1v59bAwaqqXccECb9FLSkJMFuTGKJJ+rSinYeDEWug6uA9jIA/DXaZTClLcjKCfuGUNPRBA2R//abzety6PbJKGmvAjtCWhjSVbkzEZGWlTcIKglfSKmaKZVEF5qgCDZTbSYO6ER2jceoMGCtrRGEaWEGVP2T2SvbgOAEjmQjUBKCUnw2IL8aFhZRHnyR0hFGhQwd5XVrmssKPX/9+uKrntBMqjqEC879CFsAP+cVmp609lTuCLgl8tNzq/KrndSsLCxsbG+mNXNp2Vhb0TCaDleeZ91Gdz5bneUSIfQbbql2dR9kxj1F8e41U55/Sc/lGoVDM+UUpv3E6X5hX1k2y8ay9WZ1Houl5+Df/VO4YjAQ3DpRmdf5ELl1WiumSoSs6lb5ZRU/pq/l2Fsr11WK6KL5R9PWyWJKCT78spMtiSUp/CeD9y/wC6wgxgk9qUrHslEO6xPAYjZlPHC8fTcslHoKjcxEjluK031TMMCxTfTYoDLmmi5NM9Vx5yBScAYmyYMRvWY2US0ORIZ/jumLqMPAySbGZL0WXXtT6xGVB4fU6KH8i/jyNW0vD1qNRkXShEAkF5flqQ7Atw2RChg+qrudKOT1EhVEfNLDJbAwfauA+U4sb6RJxhWTvJo3kSDn2xri4Cup+bDAhzIV+MkUzXObQvUDYQrFQLmaGZVo4CABoVdoGsFhj1WwL6APy5XxGmoQ8KkkM2tChVqgXNxOTHtuE8mYQ+aQzgbHBbMijcjCYsS2tEucsjrRlZoooj7NfZkUr5E1REpfFKRoylQ/lM/mszP75Eew/w2CO0j0/l5I6cJopf0Yiyr56Y9tjbK/UJY4G0hpE6ZEzZxbOvPTfFBM40AU143rgRip2SyEd+zfmsNZjsQKP7UvIug2jICEZJtt4+eSscqtUTMpmN8rjbCa0u2mgLbOY1CbKsPyo6G5m1mhBbAthMmWKPZEYGQ/LRpbm/+wRZwuGRmCZT2eQxC6FqcBMdG9HLcUhGTBjx4It5K8+GuAUVmN+5KaDYC3pzFoqxblXmZFyhymAjLI4ypYS0H5y9pSeDe0p/DzCnio0ivlSZtieKo6zpxqm02gTpQGvsgC6scV+O9V5MKF8W8g3ujrZogL/8ukC/oy1lIoTLKWIJBZkY1GibUyY5vEZVXsyYH4mv8csWpoMMsnmC6LbTPqkeCBuqNlpu4t+m2grsm0B6jHgShEexy2iOJU2eonQzYXHV+NMV44gYzSuNLEaY8NKwJDxtYJ9zBk49fHnT2KYFJUJlSfnc5UEn6v0ZGVE4HMVYeHjT7bE/ztBP4nFQ0IhVtTPzsERxkEJTH/iLcEnTt0pPdommOPFGOpOQ9y8UlrNFk+UQDetZjMnsqCkSqv56eg5AxfGBnUeV7QwYDJjS7FTZpDlCsnpRPrsfPEExMaIMBXv7FkYphBqm1HCZbPTR10X8yPDy9TGzUUN3aweDb5P3spi2UdplvnnAl16ljccohKd92KhWCw2x23cZ9N5hEk6XW+LRgPELcRsWQI3ypnPy7G459pgRJCm6YFlbLRpLl9FsQgyW8Nwmu6QY+IjhDXD3qlrqeelmJtUM8hQk15SMzvFTOVQJ2Z10c/jUY7s6BQX6NJPP0yheyUEBEyL0m/a5BdezNS2LiRi5PRwc5970dE0hXAiMRYcUrwccUFLsft/OunMEhrSy0mNvdWHeZUThNIileo2W5FQMink6rlCpFbX24zG00slQ8/I1eBTtJqeK5WbebnaZtvd1OTnTrSZbhQLhtys0xQbeZue+AiClERgFOrlcr0UWAqcp2j+Zxh/0TN6Vi9GDF85KKDH7siWYUrk1ZcrLom70Izbea+Y2xt2WiqVFsu5aLwoAq0gQkPJI4Ajmw3idL0QYr6UXyxkx0uHQlHMS4uCwlzWUVuj2Yy2mNcAQX9Dw7RWiWN6oic3xPK6NOJxAb0gSJEZHc8bnyoxZodCFkJZOe4/Axy2kbGtRIUCCo8UsZo0Slj6meBxnyQm1SousPiYPVCfqdIyHSEUOTYOMbELKdo40XV/4iHDWfTIrBFFKZHW2AyKhzLOxkQdS8VSuZyJBsz9HTZpO5QXKuls3tXC/ujz42HMDcPJeGuPA5zu1qcwfmlaM9NWl3fIBPLqIoGyojnin8TpgjdpsHTG+F1BOZ1p9v3c8TGt6Ib4uNSiTGYmxR2jt8sFLVvOss14YALAHZ0YP89o0hYHt1mGDZWKXqSDoHYMhYsHZVIcfCSyrrN2m7HZe7lMHtP3gjVh9Dx7QuQviz4j1bSRjaJMXFaClJA3FKr2N1IWc/W8Pt60L8gbbsNKt6DPtI2YkWaEGt6Cki+XjHJWWLem1Wj3msTfV2BZv1QqV1YNN8EyYBoosHF/P05QR3b8jVYrViSO5/5ga354b2hmEKOUorx/JmTN+ov5HzvgVRhKIszLz2ZZBH9bzolGrarro3frQ/VOA18Iw+cyP/9xglKeDEHPjKFN2FyuHDE3IzIizpQb0vLc6hmmVanskyo8DMB5uFCW0xH46vbT24U+eN5ilNj+8PzyiuWtpuxWCk9uJaxf5JOakCStRfKexfMrAsUeIzeZmlVo/FR4svljw/KjxAiR29KZp4R1E3LnxC3Jn5XxTMVikNFLt8zKgjrhlsU05yFipXUonPOcBTn7HF4QzqOpqqrRDz3LNVoEDz7aGzU8WVU96/SINpecm5trkpYClhiMowb8VQtPqySSSmpZOQmTW6FAho7AicfgaN/Im9SIqKqcVVXFcEwjRSVHVd29e3//5qv9797dv/lQXQ7aQUucNN6SMq+6LB7ZO7wA70fVD1haggh1jGgNhZ1ZUJVVh7Sq6qHovKrLfnfG8nDroJm63L/z+e7DG/13zk+sOXjvP/bfvzK52u07/St/3b/1rweXX59QWeRQoNI3n+5dfQObyLhjBoIIgi3gyGw8/Nvee7f2z1/o3/1+/4NP1OXDGJ/1Y6YqdWt1+MdbMeMXZhY4B+o6eHCQBVtVrMMjtfQzjdSqeNqCNMvqwvLhcMNLzRZV3PBSs3o6rypOVS2mc0GLlt4oGgVswSO06olyugA2RyOb1lPFdFbJw+/FdF4ppQv424XWSg5+MCS+iBA5pHy9sFhsSpAW04tKNpfWG+lsCiPnuVQ2AxCL6Tz7kAeEaTmAw66wMIX96vBbTy+mctBnIV2C30V4LiuZVD5dUrLQvghPUBr0nmvkskAI6B1DyPg/zEd0ioDYwgxxsarKE0D3/nywKGdVP/StNnoOOlBH0P5Q5ei3mkVKxM2aT4xOnm4fwPRShOkP4hcMWVxs8uo7vADDXRYFgBY8jJIz+A5lzT+CDGkYgGoN9CFl5IS7ClXdrmlZxKk+Z7RdkqQiCY9l8zPaKIua9RqOvQZ4VhDZJJNJWEOp+oe5E3ikXayaTNJaQ+e6E9iAvXOI13MsCkEWhq5ldrswCEQjwR9Y1ygWcRy0PXEbRpc0YRBYMc0e/frJSBX+CawBmlqdiDtRrR5GKbusJuNr0ZPY6uEFXknEIQpdfdlSsW7dwYoMueBsNgbSGG7Sce0YDJnZV1W21W6zpVYU9fTR5xAuhgnp4+mz+IjhQHz8J3zAoB8+/DN/6LCHHTzeLXeYBlYhTiIJ9Y6eOsIRQh8tQtHYRorZkk/dKwQYSFExPijTpjUvyUQ5RhwGFrex5x1ZTm6PHEZyR13eprV2+BKf52S2u8SqwaolNdOqQYGBR/7BmEkYddDwPY9QFq3QOxgotb1et03O1W27rSHlX6n4CvwUQFJAHYCD12TXSKA0ICyRCA+NQlfoHONtE/SI9ryr8A7x9GnbbFBlnvYVtedsVYL1CuTDE6nSoNL09go3kaxI8orTka5QmKvBW492777Tv/jd4PZn+3e+7T/6ff+7dwZvvrX34euDL98bfHrxpwcX2Yf+lW/3X3vYv/PX/T99tffF/f6laz89eOvv53+niqOAoaeBaT28LQHz6BzPRQQT6oZpqZGR2C6rgWRIAK1kmiaTinJIYawMjrHtkHOG5zkpoAmYU81XAlCkHelXqVaBiw0Hu5R7DO/USDs9K3FOxelV6URFOn9FU6hPR+VeUujLJRNAbjZXUrOC5XNCZazC5xc9DHAwjtFfGDIxXCyrIFW6jrHSMSow5yDvMFSUSimnzgBpuijyLG8ufrJxPADCFyHAVVDdv5iCml4JZqFS4eHfcOFW6A7SOfGuCcCDN8ObEhj7K/+L2ph4DQP1mCsKrgJZBAHzMi+UXbdCNj3HEBfDiy8cd5doll2beCAEMPpsNcgCrBp2nwqMiR5cN8FXaHjBYuD8z3tWbEccnmK6dGRYjLV8tKJU4peO0FkFBxiIQLxzuIZBgsHHBJsvSidOEv7yHGNG4D0OG8+BD/VitngZyPU2zZanPIF1aXcSW6FLblo9EhRilTS4IYk4GCEnSVKBanLHhBEmRHIsxI4D1RSw6jpJJNOGW4N2CYHvGTO+ZLR75Jjj2M6E0VIipRmDJVpqStnmXfq3oMBk7/z04MNt6GZHFvD+tTBsRpmPS5UBe5F2gOhmF1TGLxTQiy9bu4/eGNy7ykTUwfk/7/14FeCCwmTv1fRvbNNKUDC8icrZn8GrcWeMqVCB/QN2pgGiWgdWOGZFDKtVuhUv6zgGJhmvwBE1jiTFK6LRpLgUqCURrjSUZKirZP0o+FSywwnQcLA7zBCcl80k8IG3aiy0GkOGiAup4i1O3S2qtwg989zqgW/P0eKXJC0pmA+Nq++/nzl1MuVbT3UCC4VAmdJzSbCCu8YWXh0EhMTbkdLNXqfrSyNct2CcKsRy8c4Zw22YJrcwQwofRgK//HIvk8k1OEMJNx3RyQ24syU5u8zPDu5d2d4O97didzqWfs4dK9KVKuG1KTs7jPLb2yyuURTOoOcys2UGD53+KoXh1nwz3yqUJpxfy7BwK0bBWarnE0JyCTwdF0bRhRXpEcfHme12bG9Hjn0Fr/08m+1t8YATh8UtpJ0dKV5C55VnuWCACXlbVbbnfVDzvngR1+H8/M7y/mdv7v/54eEF1lYA5jZA6HjLmOftUbaubnOO3VlihaxJ1bcr0UDmOY/Pbh1vJuZxDPMwNbQaSvJj6/DueXpnGZjA8w2w8NbmNQOPWySS1eXtbZDl29vGhmF6/tUjtpOGat26bTjN9IYDpiRSPIHjCSDjwxEW0K3Oo7VGUZpfAg121uwQu+clEHxcbV5VyxYymeTODhicjdUEQXGfhOmJa/DVpb33bvUvfNG/f+9x+inTfnZ2kkswfYzC8f4oD0rk9LAI6tttYMUVJgpC3xSmVmVXR6ncKFDorVKuCwYEuxMqiINJpf6lZ1XxEjNQguxDJbzlDO2B+LZz3I+NOL3sZZo7tDDIEXG6uTnqDaBz7V9Ok1gjW1U1CJ/6NjTXo7Csex3Lv5krePSvUWPPbLjss5s4p+uaUoAfvQhW3IrRrVL5zgL8rHsRdqjoRwxNimNFLHwx0ijrJekeAPmsvkqXrBwe2//+zcH1D5iq59pLGxGkSMojEG9dq7Hkd0oOZEj2nFBF6Oxz/7NHoE/W0dyp8smTIGmKcKS6qh68enfwhzcHN74e/OWTYTDUsaytm65ZN9sgv8QbyTRFJCIDnqLDUiOI4B1yVEbQAARgwHW12r96eXD7c97hva8AJOjVWjBLNRZKYr4F6wwPdPk36kW6oa5U2JM8nYKlHUPXNDfMhttwVqCSBKj91aX+hYv7D+72L3wuUZ56n+hQJocgUB8P+6WBoZjOkyO83aHuW6HHG8wRGqIxMHdiBxJ1AAUbeIhNcKKG4cYPMLwqkYuLZGw9fxXySJs//bt3b//04PLe11/v3j0/+PpTzhMPXut/9gV48gGmzIc/uHF+/+arUHP33keDD353cP0P6XRaHUG5WEmJZ+JqlFHAAMNLBqsxlxzS4JzGpiyOOknNJ1pjtWet1XCDK1KElgGsFC6dBB5UoyNQR8t5OfrhD3cSSkNN+RHIatRgF85Hqsv9z/59cO19dHcQRpoVB4Y68wGFNzzMxVtl1LkYysdLUOHwKPRKp7v/zeXBxdnEY7SLVkwfLA1EXR5c/67/p48D1CyysaP81x1l8NEP8CYo7nXxhswmfdW/+OXBB58Fr5oEnXr2anDjy/1v3oa2YUOrsQo2I3+/HVBuRmxCCm8YjgXqxK2MXUeEJ7yAYNhuEysRaZzcUXbvPxxcf3P3/n/0r361f/tm//dvj1sqGARAJa8p3E1jsYApRhQ7H+rTT28juJ2nn1aUl61tDjRONMm8BZ7S42HuNxYx3/vhT/0H1xiXPi7y4wc1K/IRM8PwXG510c/CtkAQkfCXN1vC8mWuCdrqnCpUqhme+kqSup797z4EdmVrTJ3OvpHPQ6vLs9ksoxcku5GSrntY9tIrfmYZd/9Q1rCJG1y7y2UPK93miAbRb5rCrr5S0XwZxUY6FvKN8/1Hlxk5mPaQuxCIGAE6CxGGuFQ9OP/Xgw/f3b91u//Nh3FMGCoR0c6z6IU+vqU3+ObH/asPD67d6d+7+dODi/3b7/cvvPbTg7fAaOqYVo0ZfNHbjTvGpv8mcg+yZCCKSgycum41m8lo4Lm0u1V18O2V/vlLoH3ZxjQbBihmNgCYpd27bx98cBVUeP+1C/2H/37wyd8YokxIAr1BxrJViIF5OrdoKXGLjnZNE0Ri5IKkSSeS5s139q6/PZI0GZEa4MUnokRPKikl6xMG2iXi1DmGiEc0TXLaFTISaryhGqu9GgYNkIO8CIzg3Yfv7D38Bu062fXaGQ9BHdy9ABqLi7srXw5uvLb3xX0oYaY9K//pwUf9dz/pf3GJxRzBloRq/Svvs2mLt1/pKJxOjR0yYv4Yz/GFTi/+fvfeG/tf/BmmXxxAMLusMTuhFC/4BXcgAsEPeVTRepaG4UPHz+zy0VGiPbhtO0aujjQRu3Y3MWylaSyaGAuCXSGdNq2WnVCP44BYzxgz3EKnxkmrIzt3CG6/DDszMf7fP1TjjXWQ9fF8GTYI38m1pdU13IC/rsxN4zRMbRXHexcjFpc2crRz07giQnRADDVMjg5EU3MiLDa+GT/3H8eX9NBeGPCgHOo/sTNc8dEPEE7pTKHA/pcCILF2ktjNeHMqgoFwMHqcxUSrDUckghvOpTADVx5c+r8KYmf/NmiF8weXXx9cvA6fDz69PGW8gdGX9q6OQF2k6WOgzqXVaNQ5/LiQBpNhAREEOcVGHKhVsd4INCRmmAkP+TzlOFR8AF126jGh7n37l4NX7wbjZI+DP/0bTNw4OPjHWAdDGUU2u3UftxfV/oVbB6/dUl9RfhF3Mf8YqRxsC+IXGTB8fN8Xr81j6odtnX36cf9jJHak/+CLD1rgoFXbRqfeNBRMUq8o/rBQzmIJ3Xf3y6hjG/NFCgmsmeRzisX8xKU6HgHcMLSMjoyEtGK+fK9/9Z3+5Qvgpfks4zearguaazQKPE+NkMBjg+lAo59RM1oBZPrMIe/+7ZvBe/85eP/zwY1PwO7a//EOM7qYCcW2INkUVNX/AX9SJ06kjh71x4CQUhTyNEPgW28Tx/C312ceAwM9HE2UVzmmM9MlXJmbZECck4UU7rOr6tx0Zof8NSIjjY5pGtd8iTMShG95DJke8a4WrpJMXGBqZK5FmGEwle8pnCRWl7nvev/e3leXmE0IBipGYG/c6t+52X/1h+E4LFihu3dvHtz/ePCHt/9+/nIkvPz38+8cXL8E1i/LOgVoM7l1QSCXknV0yJiT4+egzjA7eP/GwTs/gjeze//zafTn7AjFBYSZVMDhS9+rImed0YWFnCJJ56gMFV5qoRjkqsqtRgSjT1E0T9m6pWItqC4IueGqHbtpgsXSZKKqGkqttOnabP3zVL1QntExRpozWVBtqduC1BFh7JzVc5XCIvxTA3BcNgXwkmN4gkkGHl+mnOQbfZQg/lfYdEwPHMlZIp7SyX51efDWo/7F7xQeHqOvkjvK3u039n68Ovj4BojK3Uf/tvfRXWCywfkvBu/+7/69KyA5HydoGZuYNN2gJa4Pdjf2vr7Zv3oRFrCUQUKJldyBVYzRhwtf9L/5z1k5XthWo+lE1TERfqoB4nytYJpHGPYuSGGmqGgKXWLVcFf54JMjDL1hA048FTnK7GpRPw58TU3I3SIWrFJ654M/65NtP7nvliqeuvSzn5j7ZTZ3JhmBNKk33M2l++bBM89yi/dv0vmihtnvmqKn9TJ3cFS3Y+De8dg+KSJCx+NHGGXJmHxkjrScaTs9jw07JBIdZhte3DJnp7wiKVbDeWrJneGYqHA/QGz78FvBeEFyDBR+lgwAxWWs+wPiieiz74hMjP+r+3/5fu8H3A7dv/X2JM6MiZpFv0AtQHlWQC21//YfQWczQ4XFljGGF43Wc5LQZUsj9ckddfrO7CaJTaJEx9la6RkrpDo6RhUXe5MzTVGQU8WOtq7g06LVdO0TMXLI7ecWzUKeXUZIqdRrmkL3t0EajExZnyIHdOoO0T2yDdfDObvzV4ZbbJIny3e015jEF7bh917/dPD9NdbSzzT/cJu+nWE2qY+GX4GWUHH789oPLIzNNJvqy3RaTfOziLJ6xqc8vbA1hvJTCEpJCE8ljMKIL2Nz/2B84GhRhlYOKxO+Kc8fvH9q0T+hvC2ozp2ZsEIHnvctmjoYkJ9+uy5Owk6/ATYniHkxeWlihFE6u/l4CUjqsn9FweDe9f7vPqAHAmfZsKPBFJBEMzlxQHTJCaICY6QJ+DhmUXRcOAZu5MTmqvOdBNknxoM+s/Oaxs4cJGWUVzDVEY39+ESmG7eCuyJ2796Gxbx39Q2ARH2l4KKHcelN0mZHYpi6UYIkgx0Whp0/vhQb0nA0I4rA5DBG9OtOq7HfdJrgTszQAGeFX/MDyvS31NpPdKdWD80R3KoZND8xJkQeJAfGmo50KUrwKtM76TFXYUS2suXv5AGf5srVvc/u7f/l44M/Xt2/+fAxdpMPKezLHhV2wRqo6SDM6eejm8D/66aLX/ZHg+5ossI7AIpZ7hFoHAc8BUNz4PGQE14PbVjsW4YN/u2A9Dy4Qr8OQf5eQJmxuC4RT+LEpSjhUlTj7qOARRGXRgBoNTlfaP6jsOEQAzwSOKO7sZPr1eL2EWLF25CkHGIbzEkM14qEAxNPYgEzsUS8OOMza+PnrTSfv4PBxJ2XEoY7DFP7WZ6xFssXMSmJ4qGQ4SgpjbhNiLbJqGpDINlwaObmo49ZFI1FQPqXHh28enf/ze/73/1+9+75gz9e2L/91uAPH0rHAkeHyabtl0by+teuHHxKQ5Ov3u1fuc466j+6/NODywfnP9j/86eDG68dfPotSIr+lW/3Pvph8O7nLNEcMyZ8CTI0MN/k8GXhNIKMnjSoqsHFDd3N+EPas3pqsSdxRAqNzhOKP8w0hrrJqXORPHpgD9Qz3fxgMWJ20CowXIXk4ljxlJz7P8j8S9o=",
}

# app.py intentionally is not live-imported: Streamlit scripts execute their
# top-level code on import, which could create a DB connection or a log entry.
# It is syntax-checked, while its side-effect-free dependencies are imported.
LIVE_IMPORT_MODULES = (
    "src.config",
    "src.database",
    "src.search",
    "src.formatting",
    "src.copilot_prompt",
)


def decode_file(encoded: str) -> bytes:
    return zlib.decompress(base64.b64decode(encoded.encode("ascii")))


def backup_existing_files() -> tuple[Path, list[str]]:
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_dir = PROJECT_ROOT / f"_upgrade_backup_v3_{timestamp}"
    backed_up: list[str] = []
    for relative_path in FILES:
        target = PROJECT_ROOT / relative_path
        if target.exists():
            destination = backup_dir / relative_path
            destination.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(target, destination)
            backed_up.append(relative_path)
    return backup_dir, backed_up


def write_files() -> tuple[list[str], str | None, str | None]:
    """Atomically replace each payload file where the OS permits it."""
    written: list[str] = []
    for relative_path, encoded_content in FILES.items():
        temporary: Path | None = None
        try:
            destination = PROJECT_ROOT / relative_path
            destination.parent.mkdir(parents=True, exist_ok=True)
            temporary = destination.with_name(destination.name + ".upgrade_v3_tmp")
            temporary.write_bytes(decode_file(encoded_content))
            os.replace(temporary, destination)
            written.append(relative_path)
            print(f"  wrote {relative_path}")
        except Exception as exc:  # pragma: no cover - platform failure path
            if temporary is not None:
                try:
                    temporary.unlink(missing_ok=True)
                except OSError:
                    pass
            return written, relative_path, str(exc)
    return written, None, None


def validate_syntax() -> list[tuple[str, str]]:
    errors: list[tuple[str, str]] = []
    for relative_path in FILES:
        if relative_path.endswith(".py"):
            try:
                py_compile.compile(str(PROJECT_ROOT / relative_path), doraise=True)
            except py_compile.PyCompileError as exc:
                errors.append((relative_path, str(exc)))
    return errors


def validate_imports() -> tuple[bool, str]:
    sys.path.insert(0, str(PROJECT_ROOT))
    if importlib.util.find_spec("streamlit") is None:
        return False, "Streamlit is not installed. Run setup.bat, then re-run this upgrade."
    try:
        for module_name in LIVE_IMPORT_MODULES:
            importlib.import_module(module_name)
    except Exception as exc:  # pragma: no cover - validation path
        return False, f"{module_name} failed to import: {exc}"
    return True, ""


def rollback(written: list[str], backup_dir: Path, backed_up: list[str]) -> None:
    print("Rolling back changed files...")
    failures: list[tuple[str, str]] = []
    for relative_path in written:
        target = PROJECT_ROOT / relative_path
        try:
            if relative_path in backed_up:
                shutil.copy2(backup_dir / relative_path, target)
            else:
                target.unlink(missing_ok=True)
        except Exception as exc:  # pragma: no cover - platform failure path
            failures.append((relative_path, str(exc)))
    if failures:
        print(f"Rollback could not restore every file. Originals remain in: {backup_dir}")
        for relative_path, message in failures:
            print(f"  {relative_path}: {message}")
    else:
        print("Rollback complete. The previous installation was restored.")


def main() -> int:
    print("=" * 60)
    print(" Company Knowledge Search -- Upgrade v3")
    print(" Screenshot-faithful Streamlit presentation refresh")
    print("=" * 60)
    if not (PROJECT_ROOT / "app.py").is_file() or not (PROJECT_ROOT / "src").is_dir():
        print("ERROR: Run upgrade_v3.py from the company-knowledge-search root.")
        return 1

    backup_dir, backed_up = backup_existing_files()
    print(f"Backed up {len(backed_up)} runtime file(s) to: {backup_dir}")
    written, failed_path, error_message = write_files()
    if failed_path is not None:
        print(f"ERROR while writing {failed_path}: {error_message}")
        rollback(written, backup_dir, backed_up)
        return 1

    syntax_errors = validate_syntax()
    if syntax_errors:
        print("ERROR: syntax validation failed.")
        for relative_path, message in syntax_errors:
            print(f"  {relative_path}: {message}")
        rollback(written, backup_dir, backed_up)
        return 1

    imports_ok, import_error = validate_imports()
    if not imports_ok:
        print(f"ERROR: import validation failed: {import_error}")
        rollback(written, backup_dir, backed_up)
        return 1

    print("Syntax and import validation passed.")
    print(f"Previous app.py is backed up at: {backup_dir}")
    print("Preserved: data/knowledge.db, data/config.json, logs/, source documents, and indexes.")
    print("No database rebuild or configuration reset was performed.")
    print("Upgrade complete. Run start.bat.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
