# Установка

### Локальный файл / CDN

[https://cdn.jsdelivr.net/npm/goodshare.js](https://cdn.jsdelivr.net/npm/goodshare.js@4/goodshare.min.js)

<!--email_off-->
[jsDelivr](https://www.jsdelivr.com)&nbsp;&mdash; это общедоступная CDN (сеть доставки контента с открытым исходным кодом), разработанная [ProspectOne](https://prospectone.io), ориентированная на производительность, надежность и безопасность. Он может свободно использоваться для всех, без ограничений пропускной способности.
<!--/email_off-->

Вы, также, можете использовать конкретную версию, с помощью ссылки вида:

``` html
<script src="https://cdn.jsdelivr.net/npm/goodshare.js@4.0.0/goodshare.min.js"></script>
```

Разместите вызов главного скрипта `goodshare.js` перед закрывающим тегом `body`:

``` html
<script src="/path/to/goodshare.min.js"></script>
```

### npm

``` bash
$ npm install goodshare.js --save
```

При использовании модульной системы сборки:

``` js
require('goodshare.js');
```

> Это не требуется при подключении через глобальный тег `script`.

### Сборка версии, находящейся в разработке

Если вы хотите использовать версию `goodshare.js` в разработке, склонируйте репозиторий с GitHub и выполните сборку вручную:

``` bash
$ git clone https://github.com/koddr/goodshare.js.git node_modules/goodshare.js
$ cd node_modules/goodshare.js
$ npm install
$ npm run build
```
