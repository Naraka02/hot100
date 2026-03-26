PORT ?= 8000
HOST ?= 0.0.0.0

.PHONY: help check serve deploy clean

help:
	@printf '%s\n' \
		'Available targets:' \
		'  make check   - 校验前端脚本语法' \
		'  make serve   - 启动本地静态服务器' \
		'  make deploy  - 一键部署到本地可访问状态' \
		'  make clean   - 清理 Python 缓存文件'

check:
	node --check app.js

serve:
	python3 -m http.server $(PORT) --bind $(HOST)

deploy: check
	@printf 'Serving http://127.0.0.1:%s\n' "$(PORT)"
	python3 -m http.server $(PORT) --bind $(HOST)

clean:
	find . -type d -name '__pycache__' -prune -exec rm -rf {} +
