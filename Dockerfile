FROM ship_fast_react_python:v1.0
CMD ["node", "--inspect=0.0.0.0:9229", "node_modules/.bin/next", "dev"]

