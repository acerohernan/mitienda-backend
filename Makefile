# /bin/bash

setup-docker:
	docker run -p 3000:3000 -d -e "TYPEORM_DATABASE=railway" -e "TYPEORM_HOST=containers-us-west-148.railway.app" -e "TYPEORM_PASSWORD=kxyVsqsWhgnA9F8nfLrX" -e "TYPEORM_PORT=6178" -e "TYPEORM_USERNAME=postgres" mitienda-local

#TYPEORM_DATABASE=railway
#TYPEORM_HOST=containers-us-west-148.railway.app
#TYPEORM_PASSWORD=kxyVsqsWhgnA9F8nfLrX
#TYPEORM_PORT=6178
#TYPEORM_USERNAME=postgres