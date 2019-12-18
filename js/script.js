// Реализовать класс, описывающий новость (заголовок, текст, массив тегов, дата публикации). 
// - В классе необходимо реализовать один метод print, который выводит всю информацию через document.write() 
// - Если с даты публикации прошло менее дня, то выводится «сегодня», если с даты публикации прошло менее недели, то выводится «N дней назад», в остальных случаях, полная дата в формате «дд.мм.гггг».

let data = {
    title: 'Netflix раскрыл данные просмотров фильма «Ирландец»',
    preview: 'Более 26 млн просмотров за первые семь дней с момента релиза.',
    image: 'https://rozetked.me/images/uploads/N0NzEdYtGEFq.jpg',
    date: 'Wed Dec 14 2019 20:42:34 GMT+0200',
    tags: ['кино', 'netflix']
}

let dataArray = [
    {
        title: 'Netflix раскрыл данные просмотров фильма «Ирландец»',
        preview: 'Более 26 млн просмотров за первые семь дней с момента релиза.',
        image: 'https://rozetked.me/images/uploads/N0NzEdYtGEFq.jpg',
        date: 'Wed Dec 14 2019 20:42:34 GMT+0200',
        tags: ['кино', 'netflix']
    }, {
        title: 'Апдейты приложений недели. 9-15 декабря',
        preview: 'Google Chrome, «Google Карты» и кое-что ещё.',
        image: 'https://rozetked.me/images/uploads/thumb/pXCC2nnKm5nd.jpg',
        date: 'Wed Dec 13 2019 20:42:34 GMT+0200',
        tags: ['обсудить']
    }, {
        title: 'Canalys: рынок носимых устройств вырос на 65% в третьем квартале года',
        preview: 'Продажи гаджетов в Азиатско-Тихоокеанском регионе и вовсе удвоились.',
        image: 'https://rozetked.me/images/uploads/thumb/gOVNfzPrUGqV.jpg',
        date: 'Wed Dec 12 2019 20:42:34 GMT+0200',
        tags: ['обсудить']
    }, {
        title: 'Amazfit представит новый умный продукт на CES 2020',
        preview: 'Вероятно, умные кроссовки или наушники.',
        image: 'https://rozetked.me/images/uploads/thumb/nekBceqe7CeN.jpg',
        date: 'Wed Dec 01 2019 20:42:34 GMT+0200',
        tags: ['кино', 'netflix']
    }, {
        title: 'Pringles выпустят чипсы со вкусом «Огурчика Рика»',
        preview: 'Приобрести ограниченную серию можно будет в США со 2 февраля.',
        image: 'https://rozetked.me/images/uploads/thumb/Nbivaro9wIlh.jpg',
        date: 'Wed Oct 14 2019 20:42:34 GMT+0200',
        tags: ['pringles']
    }, {
        title: 'Из машины менеджера Facebook украли жёсткие диски с личными данными сотрудников',
        preview: 'Затронута приватная информация 29 000 человек, работающих в офисах соцсети в США.',
        image: 'https://rozetked.me/images/uploads/thumb/AzY1LFLvG2WV.jpg',
        date: 'Wed Dec 04 2019 20:42:34 GMT+0200',
        tags: ['facebook', 'netflix']
    }
];

class NewsItem {
    constructor(data) {
        this.title = data.title;
        this.preview = data.preview;
        this.image = data.image;
        this.date = data.date;
        this.tags = data.tags;
        this.index = data.index || '';
    }

    print() {
        let result = ``;
        result += `<div class="grid__cell"><div class="block-news">`;
        result += `<div class="block-news__image" style="background-image: url('${this.image}');"></div>`;
        result += `<div class="block-news__caption">${this.title}</div>`;
        result += `<div class="block-news__preview">${this.preview}</div>`;

        let date;
        if (moment(this.date).diff(moment()) < 0) {
            if (moment(this.date).diff(moment()) < -(60 * 60 * 24 * 1000 * 7)) {
                date = moment(this.date).format('LL');
            } else {
                date = moment(this.date).fromNow();
            }
        } else {
            date = moment(this.date).format('LL');
        }

        result += `<div class="block-news__data">${date}</div>`;

        if (this.tags.length) {
            result += `<div class="block-news__tags">`;

            for (let tag of this.tags) {
                result += `<span class="block-news__tag-item">${tag}</span>`;
            }

            result += `</div>`;
        }

        result += `<div class="block-news__remove" onclick="removeNews(${this.index})">x</div>`;

        result += `</div></div>`;
        document.getElementById('data').innerHTML += result;
    }
}

let newsElement = new NewsItem(data);
// newsElement.print();

// Реализовать класс, описывающий новостную ленту. Класс должен содержать:
// - массив новостей;
// - get-свойство, которое возвращает количество новостей;
// - метод для вывода на экран всех новостей;
// - метод для добавления новости;
// - метод для удаления новости;
// - метод для сортировки новостей по дате (от последних новостей до старых);
// - метод для поиска новостей по тегу (возвращает массив новостей, в которых указан переданный в метод тег).

class NewsList {
    constructor(_list) {
        this.list = _list;
    }
    get count() {
        return this.list.length;
    }
    set addNews(data) {
        this.list = this.list.concat(data);
    }
    set removeNews(index) {
        this.list.splice(index, 1);
    }
    set searchByTag(str) {
        let result = [];
        for (let item of this.list) {
            if (item.tags.length) {
                for (let tag of item.tags) {
                    if (str === tag) {
                        result.push(item);

                    }
                }
            }
        }
        newsElements.clearData();
        if (result.length) {
            let searchResults = new NewsList(result);
            searchResults.print();
        } else {
            if (str === '') {
                this.print();
            }
        }

    }
    print() {
        for (let item of this.list) {
            let newsItem = new NewsItem(item);
            newsItem.index = this.list.indexOf(item);
            newsItem.print();
        }
    }
    sortByDate(dirrection) {
        this.list.sort((a, b) => {
            if (dirrection === 'asc') {
                return moment(b.date) - moment(a.date);
            } else {
                return moment(a.date) - moment(b.date);
            }

        });
    }
    clearData() {
        document.getElementById('data').innerHTML = '';
    }
}

let newsElements = new NewsList(dataArray);
newsElements.print();

sort = (dirrection) => {
    newsElements.clearData();
    newsElements.sortByDate(dirrection);
    newsElements.print();
}

addNews = () => {
    const newsTitle = prompt('Enter news title');
    const newsPreview = prompt('Enter news preview');
    const newsImage = prompt('Insert image URL');
    const newsTags = prompt('Enter tags through comma');

    const newsData = {
        title: newsTitle,
        preview: newsPreview,
        image: newsImage == '' ? '/images/no-image.jpg' : newsImage,
        date: moment(),
        tags: newsTags == '' ? [] : newsTags.split(',')
    }

    newsElements.addNews = newsData;
    newsElements.clearData();
    newsElements.print();
}

removeNews = (index) => {
    const allow = confirm('Are you sure to delete this news?');
    if (allow) {
        newsElements.removeNews = index;
        newsElements.clearData();
        newsElements.print();
    }
}

searchByTag = (element) => {
    newsElements.searchByTag = element.value;
}