// Tour data store
const tourData = {
    themes: [
        { id: 1, name: 'Kültür Turu' },
        { id: 2, name: 'Doğa ve Macera' },
        { id: 3, name: 'Tarih Turu' },
        { id: 4, name: 'Gastronomi Turu' },
        { id: 5, name: 'Plaj ve Deniz' }
    ],
    
    regions: [
        { id: 1, name: 'Marmara' },
        { id: 2, name: 'Ege' },
        { id: 3, name: 'Akdeniz' },
        { id: 4, name: 'İç Anadolu' },
        { id: 5, name: 'Karadeniz' },
        { id: 6, name: 'Doğu Anadolu' },
        { id: 7, name: 'Güneydoğu Anadolu' }
    ],

    subRegions: {
        1: [ // Marmara
            { id: 101, name: 'İstanbul' },
            { id: 102, name: 'Bursa' },
            { id: 103, name: 'Çanakkale' }
        ],
        2: [ // Ege
            { id: 201, name: 'İzmir' },
            { id: 202, name: 'Muğla' },
            { id: 203, name: 'Aydın' }
        ],
        3: [ // Akdeniz
            { id: 301, name: 'Antalya' },
            { id: 302, name: 'Mersin' },
            { id: 303, name: 'Adana' }
        ],
        4: [ // İç Anadolu
            { id: 401, name: 'Ankara' },
            { id: 402, name: 'Konya' },
            { id: 403, name: 'Kayseri' }
        ],
        5: [ // Karadeniz
            { id: 501, name: 'Trabzon' },
            { id: 502, name: 'Samsun' },
            { id: 503, name: 'Rize' }
        ]
    },

    countries: [
        { id: 1, name: 'Türkiye' },
        { id: 2, name: 'Yunanistan' },
        { id: 3, name: 'İtalya' },
        { id: 4, name: 'İspanya' },
        { id: 5, name: 'Mısır' }
    ],

    cities: {
        1: [ // Türkiye
            { id: 1001, name: 'İstanbul' },
            { id: 1002, name: 'Ankara' },
            { id: 1003, name: 'İzmir' }
        ],
        2: [ // Yunanistan
            { id: 2001, name: 'Atina' },
            { id: 2002, name: 'Selanik' }
        ],
        3: [ // İtalya
            { id: 3001, name: 'Roma' },
            { id: 3002, name: 'Venedik' }
        ]
    }
};