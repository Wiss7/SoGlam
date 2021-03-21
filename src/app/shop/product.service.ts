import { ReplaySubject, Subject } from 'rxjs';
import { Product } from './product.model';

export class ProductService {
  private products: Product[] = [
    new Product(
      1,
      'Mango Fizz',
      'Our famous African Oil is a 100% natural oil with no colorings or chemicals nor alcohol, it will hydrate, nourish and give glow to your skin.',
      'Solarium Oil',
      '250ml',
      50000,
      30,
      35000,
      'Carrot Oil, Avocado Oil, Almond Oil, Glycerine, Grapeseed Oil,Vitamin E, Essential Oils',
      'Shake well before use, apply it as your daily body oil or as your Natural remedy for sunlamp tanning before UV exposure.',
      true,
      true,
      true,
      [
        { name: 'IMG_20201207_223455_979.jpg', isDefault: true },
        { name: 'SoGlamLogo.png', isDefault: false },
        { name: 'SoGlamSlogan.png', isDefault: false },
      ],
      [
        { review: 'Great', stars: 5 },
        { review: 'Great', stars: 5 },
      ]
    ),

    new Product(
      2,
      'Burburry',
      'This 100% Ntaural Perfume is rich in fine aroma that will please your senses while lasting for a lot longer than any other perfume.',
      'Solid perfume- Oud Blast',
      '20ml',
      25000,
      0,
      0,
      'Coconut Oil, Almond Oil. Cocoa Butter, Organic Beeswax, Vitamin E, Essential Oils',
      'Using your wooden stick, dip a tiny quantity of the product and apply it to pulse points such as wrists or neck, it can also be used on your hair and on sensitive areas',
      false,
      true,
      true,
      [
        { name: 'IMG_20201207_223455_979.jpg', isDefault: false },
        { name: 'SoGlamLogo.png', isDefault: true },
        { name: 'SoGlamSlogan.png', isDefault: false },
      ],
      [
        { review: 'Great', stars: 4 },
        { review: 'sucks', stars: 1 },
      ]
    ),
    new Product(
      1,
      'Mango Fizz',
      'Our famous African Oil is a 100% natural oil with no colorings or chemicals nor alcohol, it will hydrate, nourish and give glow to your skin.',
      'Solarium Oil',
      '250ml',
      50000,
      30,
      35000,
      'Carrot Oil, Avocado Oil, Almond Oil, Glycerine, Grapeseed Oil,Vitamin E, Essential Oils',
      'Shake well before use, apply it as your daily body oil or as your Natural remedy for sunlamp tanning before UV exposure.',
      true,
      true,
      true,
      [
        { name: 'IMG_20201207_223455_979.jpg', isDefault: true },
        { name: 'SoGlamLogo.png', isDefault: false },
        { name: 'SoGlamSlogan.png', isDefault: false },
      ],
      [
        { review: 'Great', stars: 5 },
        { review: 'Great', stars: 5 },
      ]
    ),

    new Product(
      2,
      'Burburry',
      'This 100% Ntaural Perfume is rich in fine aroma that will please your senses while lasting for a lot longer than any other perfume.',
      'Solid perfume- Oud Blast',
      '20ml',
      25000,
      0,
      0,
      'Coconut Oil, Almond Oil. Cocoa Butter, Organic Beeswax, Vitamin E, Essential Oils',
      'Using your wooden stick, dip a tiny quantity of the product and apply it to pulse points such as wrists or neck, it can also be used on your hair and on sensitive areas',
      false,
      true,
      true,
      [
        { name: 'IMG_20201207_223455_979.jpg', isDefault: false },
        { name: 'SoGlamLogo.png', isDefault: true },
        { name: 'SoGlamSlogan.png', isDefault: false },
      ],
      [
        { review: 'Great', stars: 4 },
        { review: 'sucks', stars: 1 },
      ]
    ),
    new Product(
      1,
      'Mango Fizz',
      'Our famous African Oil is a 100% natural oil with no colorings or chemicals nor alcohol, it will hydrate, nourish and give glow to your skin.',
      'Solarium Oil',
      '250ml',
      50000,
      30,
      35000,
      'Carrot Oil, Avocado Oil, Almond Oil, Glycerine, Grapeseed Oil,Vitamin E, Essential Oils',
      'Shake well before use, apply it as your daily body oil or as your Natural remedy for sunlamp tanning before UV exposure.',
      true,
      true,
      true,
      [
        { name: 'IMG_20201207_223455_979.jpg', isDefault: true },
        { name: 'SoGlamLogo.png', isDefault: false },
        { name: 'SoGlamSlogan.png', isDefault: false },
      ],
      [
        { review: 'Great', stars: 5 },
        { review: 'Great', stars: 5 },
      ]
    ),

    new Product(
      2,
      'Burburry',
      'This 100% Ntaural Perfume is rich in fine aroma that will please your senses while lasting for a lot longer than any other perfume.',
      'Solid perfume- Oud Blast',
      '20ml',
      25000,
      0,
      0,
      'Coconut Oil, Almond Oil. Cocoa Butter, Organic Beeswax, Vitamin E, Essential Oils',
      'Using your wooden stick, dip a tiny quantity of the product and apply it to pulse points such as wrists or neck, it can also be used on your hair and on sensitive areas',
      false,
      true,
      true,
      [
        { name: 'IMG_20201207_223455_979.jpg', isDefault: false },
        { name: 'SoGlamLogo.png', isDefault: true },
        { name: 'SoGlamSlogan.png', isDefault: false },
      ],
      [
        { review: 'Great', stars: 4 },
        { review: 'sucks', stars: 1 },
      ]
    ),
    new Product(
      1,
      'Mango Fizz',
      'Our famous African Oil is a 100% natural oil with no colorings or chemicals nor alcohol, it will hydrate, nourish and give glow to your skin.',
      'Solarium Oil',
      '250ml',
      50000,
      30,
      35000,
      'Carrot Oil, Avocado Oil, Almond Oil, Glycerine, Grapeseed Oil,Vitamin E, Essential Oils',
      'Shake well before use, apply it as your daily body oil or as your Natural remedy for sunlamp tanning before UV exposure.',
      true,
      true,
      true,
      [
        { name: 'IMG_20201207_223455_979.jpg', isDefault: true },
        { name: 'SoGlamLogo.png', isDefault: false },
        { name: 'SoGlamSlogan.png', isDefault: false },
      ],
      [
        { review: 'Great', stars: 5 },
        { review: 'Great', stars: 5 },
      ]
    ),

    new Product(
      2,
      'Burburry',
      'This 100% Ntaural Perfume is rich in fine aroma that will please your senses while lasting for a lot longer than any other perfume.',
      'Solid perfume- Oud Blast',
      '20ml',
      25000,
      0,
      0,
      'Coconut Oil, Almond Oil. Cocoa Butter, Organic Beeswax, Vitamin E, Essential Oils',
      'Using your wooden stick, dip a tiny quantity of the product and apply it to pulse points such as wrists or neck, it can also be used on your hair and on sensitive areas',
      false,
      true,
      true,
      [
        { name: 'IMG_20201207_223455_979.jpg', isDefault: false },
        { name: 'SoGlamLogo.png', isDefault: true },
        { name: 'SoGlamSlogan.png', isDefault: false },
      ],
      [
        { review: 'Great', stars: 4 },
        { review: 'sucks', stars: 1 },
      ]
    ),
    new Product(
      1,
      'Mango Fizz',
      'Our famous African Oil is a 100% natural oil with no colorings or chemicals nor alcohol, it will hydrate, nourish and give glow to your skin.',
      'Solarium Oil',
      '250ml',
      50000,
      30,
      35000,
      'Carrot Oil, Avocado Oil, Almond Oil, Glycerine, Grapeseed Oil,Vitamin E, Essential Oils',
      'Shake well before use, apply it as your daily body oil or as your Natural remedy for sunlamp tanning before UV exposure.',
      true,
      true,
      true,
      [
        { name: 'IMG_20201207_223455_979.jpg', isDefault: true },
        { name: 'SoGlamLogo.png', isDefault: false },
        { name: 'SoGlamSlogan.png', isDefault: false },
      ],
      [
        { review: 'Great', stars: 5 },
        { review: 'Great', stars: 5 },
      ]
    ),

    new Product(
      2,
      'Burburry',
      'This 100% Ntaural Perfume is rich in fine aroma that will please your senses while lasting for a lot longer than any other perfume.',
      'Solid perfume- Oud Blast',
      '20ml',
      25000,
      0,
      0,
      'Coconut Oil, Almond Oil. Cocoa Butter, Organic Beeswax, Vitamin E, Essential Oils',
      'Using your wooden stick, dip a tiny quantity of the product and apply it to pulse points such as wrists or neck, it can also be used on your hair and on sensitive areas',
      false,
      true,
      true,
      [
        { name: 'IMG_20201207_223455_979.jpg', isDefault: false },
        { name: 'SoGlamLogo.png', isDefault: true },
        { name: 'SoGlamSlogan.png', isDefault: false },
      ],
      [
        { review: 'Great', stars: 4 },
        { review: 'sucks', stars: 1 },
      ]
    ),
    new Product(
      1,
      'Mango Fizz',
      'Our famous African Oil is a 100% natural oil with no colorings or chemicals nor alcohol, it will hydrate, nourish and give glow to your skin.',
      'Solarium Oil',
      '250ml',
      50000,
      30,
      35000,
      'Carrot Oil, Avocado Oil, Almond Oil, Glycerine, Grapeseed Oil,Vitamin E, Essential Oils',
      'Shake well before use, apply it as your daily body oil or as your Natural remedy for sunlamp tanning before UV exposure.',
      true,
      true,
      true,
      [
        { name: 'IMG_20201207_223455_979.jpg', isDefault: true },
        { name: 'SoGlamLogo.png', isDefault: false },
        { name: 'SoGlamSlogan.png', isDefault: false },
      ],
      [
        { review: 'Great', stars: 5 },
        { review: 'Great', stars: 5 },
      ]
    ),

    new Product(
      2,
      'Burburry',
      'This 100% Ntaural Perfume is rich in fine aroma that will please your senses while lasting for a lot longer than any other perfume.',
      'Solid perfume- Oud Blast',
      '20ml',
      25000,
      0,
      0,
      'Coconut Oil, Almond Oil. Cocoa Butter, Organic Beeswax, Vitamin E, Essential Oils',
      'Using your wooden stick, dip a tiny quantity of the product and apply it to pulse points such as wrists or neck, it can also be used on your hair and on sensitive areas',
      false,
      true,
      true,
      [
        { name: 'IMG_20201207_223455_979.jpg', isDefault: false },
        { name: 'SoGlamLogo.png', isDefault: true },
        { name: 'SoGlamSlogan.png', isDefault: false },
      ],
      [
        { review: 'Great', stars: 4 },
        { review: 'sucks', stars: 1 },
      ]
    ),
    new Product(
      1,
      'Mango Fizz',
      'Our famous African Oil is a 100% natural oil with no colorings or chemicals nor alcohol, it will hydrate, nourish and give glow to your skin.',
      'Solarium Oil',
      '250ml',
      50000,
      30,
      35000,
      'Carrot Oil, Avocado Oil, Almond Oil, Glycerine, Grapeseed Oil,Vitamin E, Essential Oils',
      'Shake well before use, apply it as your daily body oil or as your Natural remedy for sunlamp tanning before UV exposure.',
      true,
      true,
      true,
      [
        { name: 'IMG_20201207_223455_979.jpg', isDefault: true },
        { name: 'SoGlamLogo.png', isDefault: false },
        { name: 'SoGlamSlogan.png', isDefault: false },
      ],
      [
        { review: 'Great', stars: 5 },
        { review: 'Great', stars: 5 },
      ]
    ),

    new Product(
      2,
      'Burburry',
      'This 100% Ntaural Perfume is rich in fine aroma that will please your senses while lasting for a lot longer than any other perfume.',
      'Solid perfume- Oud Blast',
      '20ml',
      25000,
      0,
      0,
      'Coconut Oil, Almond Oil. Cocoa Butter, Organic Beeswax, Vitamin E, Essential Oils',
      'Using your wooden stick, dip a tiny quantity of the product and apply it to pulse points such as wrists or neck, it can also be used on your hair and on sensitive areas',
      false,
      true,
      true,
      [
        { name: 'IMG_20201207_223455_979.jpg', isDefault: false },
        { name: 'SoGlamLogo.png', isDefault: true },
        { name: 'SoGlamSlogan.png', isDefault: false },
      ],
      [
        { review: 'Great', stars: 4 },
        { review: 'sucks', stars: 1 },
      ]
    ),
    new Product(
      1,
      'Mango Fizz',
      'Our famous African Oil is a 100% natural oil with no colorings or chemicals nor alcohol, it will hydrate, nourish and give glow to your skin.',
      'Solarium Oil',
      '250ml',
      50000,
      30,
      35000,
      'Carrot Oil, Avocado Oil, Almond Oil, Glycerine, Grapeseed Oil,Vitamin E, Essential Oils',
      'Shake well before use, apply it as your daily body oil or as your Natural remedy for sunlamp tanning before UV exposure.',
      true,
      true,
      true,
      [
        { name: 'IMG_20201207_223455_979.jpg', isDefault: true },
        { name: 'SoGlamLogo.png', isDefault: false },
        { name: 'SoGlamSlogan.png', isDefault: false },
      ],
      [
        { review: 'Great', stars: 5 },
        { review: 'Great', stars: 5 },
      ]
    ),

    new Product(
      2,
      'Burburry',
      'This 100% Ntaural Perfume is rich in fine aroma that will please your senses while lasting for a lot longer than any other perfume.',
      'Solid perfume- Oud Blast',
      '20ml',
      25000,
      0,
      0,
      'Coconut Oil, Almond Oil. Cocoa Butter, Organic Beeswax, Vitamin E, Essential Oils',
      'Using your wooden stick, dip a tiny quantity of the product and apply it to pulse points such as wrists or neck, it can also be used on your hair and on sensitive areas',
      false,
      true,
      true,
      [
        { name: 'IMG_20201207_223455_979.jpg', isDefault: false },
        { name: 'SoGlamLogo.png', isDefault: true },
        { name: 'SoGlamSlogan.png', isDefault: false },
      ],
      [
        { review: 'Great', stars: 4 },
        { review: 'sucks', stars: 1 },
      ]
    ),
    new Product(
      1,
      'Mango Fizz',
      'Our famous African Oil is a 100% natural oil with no colorings or chemicals nor alcohol, it will hydrate, nourish and give glow to your skin.',
      'Solarium Oil',
      '250ml',
      50000,
      30,
      35000,
      'Carrot Oil, Avocado Oil, Almond Oil, Glycerine, Grapeseed Oil,Vitamin E, Essential Oils',
      'Shake well before use, apply it as your daily body oil or as your Natural remedy for sunlamp tanning before UV exposure.',
      true,
      true,
      true,
      [
        { name: 'IMG_20201207_223455_979.jpg', isDefault: true },
        { name: 'SoGlamLogo.png', isDefault: false },
        { name: 'SoGlamSlogan.png', isDefault: false },
      ],
      [
        { review: 'Great', stars: 5 },
        { review: 'Great', stars: 5 },
      ]
    ),

    new Product(
      2,
      'Burburry',
      'This 100% Ntaural Perfume is rich in fine aroma that will please your senses while lasting for a lot longer than any other perfume.',
      'Solid perfume- Oud Blast',
      '20ml',
      25000,
      0,
      0,
      'Coconut Oil, Almond Oil. Cocoa Butter, Organic Beeswax, Vitamin E, Essential Oils',
      'Using your wooden stick, dip a tiny quantity of the product and apply it to pulse points such as wrists or neck, it can also be used on your hair and on sensitive areas',
      false,
      true,
      true,
      [
        { name: 'IMG_20201207_223455_979.jpg', isDefault: false },
        { name: 'SoGlamLogo.png', isDefault: true },
        { name: 'SoGlamSlogan.png', isDefault: false },
      ],
      [
        { review: 'Great', stars: 4 },
        { review: 'sucks', stars: 1 },
      ]
    ),
    new Product(
      1,
      'Mango Fizz',
      'Our famous African Oil is a 100% natural oil with no colorings or chemicals nor alcohol, it will hydrate, nourish and give glow to your skin.',
      'Solarium Oil',
      '250ml',
      50000,
      30,
      35000,
      'Carrot Oil, Avocado Oil, Almond Oil, Glycerine, Grapeseed Oil,Vitamin E, Essential Oils',
      'Shake well before use, apply it as your daily body oil or as your Natural remedy for sunlamp tanning before UV exposure.',
      true,
      true,
      true,
      [
        { name: 'IMG_20201207_223455_979.jpg', isDefault: true },
        { name: 'SoGlamLogo.png', isDefault: false },
        { name: 'SoGlamSlogan.png', isDefault: false },
      ],
      [
        { review: 'Great', stars: 5 },
        { review: 'Great', stars: 5 },
      ]
    ),

    new Product(
      2,
      'Burburry',
      'This 100% Ntaural Perfume is rich in fine aroma that will please your senses while lasting for a lot longer than any other perfume.',
      'Solid perfume- Oud Blast',
      '20ml',
      25000,
      0,
      0,
      'Coconut Oil, Almond Oil. Cocoa Butter, Organic Beeswax, Vitamin E, Essential Oils',
      'Using your wooden stick, dip a tiny quantity of the product and apply it to pulse points such as wrists or neck, it can also be used on your hair and on sensitive areas',
      false,
      true,
      true,
      [
        { name: 'IMG_20201207_223455_979.jpg', isDefault: false },
        { name: 'SoGlamLogo.png', isDefault: true },
        { name: 'SoGlamSlogan.png', isDefault: false },
      ],
      [
        { review: 'Great', stars: 4 },
        { review: 'sucks', stars: 1 },
      ]
    ),
    new Product(
      1,
      'Mango Fizz',
      'Our famous African Oil is a 100% natural oil with no colorings or chemicals nor alcohol, it will hydrate, nourish and give glow to your skin.',
      'Solarium Oil',
      '250ml',
      50000,
      30,
      35000,
      'Carrot Oil, Avocado Oil, Almond Oil, Glycerine, Grapeseed Oil,Vitamin E, Essential Oils',
      'Shake well before use, apply it as your daily body oil or as your Natural remedy for sunlamp tanning before UV exposure.',
      true,
      true,
      true,
      [
        { name: 'IMG_20201207_223455_979.jpg', isDefault: true },
        { name: 'SoGlamLogo.png', isDefault: false },
        { name: 'SoGlamSlogan.png', isDefault: false },
      ],
      [
        { review: 'Great', stars: 5 },
        { review: 'Great', stars: 5 },
      ]
    ),

    new Product(
      2,
      'Burburry',
      'This 100% Ntaural Perfume is rich in fine aroma that will please your senses while lasting for a lot longer than any other perfume.',
      'Solid perfume- Oud Blast',
      '20ml',
      25000,
      0,
      0,
      'Coconut Oil, Almond Oil. Cocoa Butter, Organic Beeswax, Vitamin E, Essential Oils',
      'Using your wooden stick, dip a tiny quantity of the product and apply it to pulse points such as wrists or neck, it can also be used on your hair and on sensitive areas',
      false,
      true,
      true,
      [
        { name: 'IMG_20201207_223455_979.jpg', isDefault: false },
        { name: 'SoGlamLogo.png', isDefault: true },
        { name: 'SoGlamSlogan.png', isDefault: false },
      ],
      [
        { review: 'Great', stars: 4 },
        { review: 'sucks', stars: 1 },
      ]
    ),
    new Product(
      1,
      'Mango Fizz',
      'Our famous African Oil is a 100% natural oil with no colorings or chemicals nor alcohol, it will hydrate, nourish and give glow to your skin.',
      'Solarium Oil',
      '250ml',
      50000,
      30,
      35000,
      'Carrot Oil, Avocado Oil, Almond Oil, Glycerine, Grapeseed Oil,Vitamin E, Essential Oils',
      'Shake well before use, apply it as your daily body oil or as your Natural remedy for sunlamp tanning before UV exposure.',
      true,
      true,
      true,
      [
        { name: 'IMG_20201207_223455_979.jpg', isDefault: true },
        { name: 'SoGlamLogo.png', isDefault: false },
        { name: 'SoGlamSlogan.png', isDefault: false },
      ],
      [
        { review: 'Great', stars: 5 },
        { review: 'Great', stars: 5 },
      ]
    ),

    new Product(
      2,
      'Burburry',
      'This 100% Ntaural Perfume is rich in fine aroma that will please your senses while lasting for a lot longer than any other perfume.',
      'Solid perfume- Oud Blast',
      '20ml',
      25000,
      0,
      0,
      'Coconut Oil, Almond Oil. Cocoa Butter, Organic Beeswax, Vitamin E, Essential Oils',
      'Using your wooden stick, dip a tiny quantity of the product and apply it to pulse points such as wrists or neck, it can also be used on your hair and on sensitive areas',
      false,
      true,
      true,
      [
        { name: 'IMG_20201207_223455_979.jpg', isDefault: false },
        { name: 'SoGlamLogo.png', isDefault: true },
        { name: 'SoGlamSlogan.png', isDefault: false },
      ],
      [
        { review: 'Great', stars: 4 },
        { review: 'sucks', stars: 1 },
      ]
    ),
    new Product(
      1,
      'Mango Fizz',
      'Our famous African Oil is a 100% natural oil with no colorings or chemicals nor alcohol, it will hydrate, nourish and give glow to your skin.',
      'Solarium Oil',
      '250ml',
      50000,
      30,
      35000,
      'Carrot Oil, Avocado Oil, Almond Oil, Glycerine, Grapeseed Oil,Vitamin E, Essential Oils',
      'Shake well before use, apply it as your daily body oil or as your Natural remedy for sunlamp tanning before UV exposure.',
      true,
      true,
      true,
      [
        { name: 'IMG_20201207_223455_979.jpg', isDefault: true },
        { name: 'SoGlamLogo.png', isDefault: false },
        { name: 'SoGlamSlogan.png', isDefault: false },
      ],
      [
        { review: 'Great', stars: 5 },
        { review: 'Great', stars: 5 },
      ]
    ),

    new Product(
      2,
      'Burburry',
      'This 100% Ntaural Perfume is rich in fine aroma that will please your senses while lasting for a lot longer than any other perfume.',
      'Solid perfume- Oud Blast',
      '20ml',
      25000,
      0,
      0,
      'Coconut Oil, Almond Oil. Cocoa Butter, Organic Beeswax, Vitamin E, Essential Oils',
      'Using your wooden stick, dip a tiny quantity of the product and apply it to pulse points such as wrists or neck, it can also be used on your hair and on sensitive areas',
      false,
      true,
      true,
      [
        { name: 'IMG_20201207_223455_979.jpg', isDefault: false },
        { name: 'SoGlamLogo.png', isDefault: true },
        { name: 'SoGlamSlogan.png', isDefault: false },
      ],
      [
        { review: 'Great', stars: 4 },
        { review: 'sucks', stars: 1 },
      ]
    ),
    new Product(
      1,
      'Mango Fizz',
      'Our famous African Oil is a 100% natural oil with no colorings or chemicals nor alcohol, it will hydrate, nourish and give glow to your skin.',
      'Solarium Oil',
      '250ml',
      50000,
      30,
      35000,
      'Carrot Oil, Avocado Oil, Almond Oil, Glycerine, Grapeseed Oil,Vitamin E, Essential Oils',
      'Shake well before use, apply it as your daily body oil or as your Natural remedy for sunlamp tanning before UV exposure.',
      true,
      true,
      true,
      [
        { name: 'IMG_20201207_223455_979.jpg', isDefault: true },
        { name: 'SoGlamLogo.png', isDefault: false },
        { name: 'SoGlamSlogan.png', isDefault: false },
      ],
      [
        { review: 'Great', stars: 5 },
        { review: 'Great', stars: 5 },
      ]
    ),

    new Product(
      2,
      'Burburry',
      'This 100% Ntaural Perfume is rich in fine aroma that will please your senses while lasting for a lot longer than any other perfume.',
      'Solid perfume- Oud Blast',
      '20ml',
      25000,
      0,
      0,
      'Coconut Oil, Almond Oil. Cocoa Butter, Organic Beeswax, Vitamin E, Essential Oils',
      'Using your wooden stick, dip a tiny quantity of the product and apply it to pulse points such as wrists or neck, it can also be used on your hair and on sensitive areas',
      false,
      true,
      true,
      [
        { name: 'IMG_20201207_223455_979.jpg', isDefault: false },
        { name: 'SoGlamLogo.png', isDefault: true },
        { name: 'SoGlamSlogan.png', isDefault: false },
      ],
      [
        { review: 'Great', stars: 4 },
        { review: 'sucks', stars: 1 },
      ]
    ),
    new Product(
      1,
      'Mango Fizz',
      'Our famous African Oil is a 100% natural oil with no colorings or chemicals nor alcohol, it will hydrate, nourish and give glow to your skin.',
      'Solarium Oil',
      '250ml',
      50000,
      30,
      35000,
      'Carrot Oil, Avocado Oil, Almond Oil, Glycerine, Grapeseed Oil,Vitamin E, Essential Oils',
      'Shake well before use, apply it as your daily body oil or as your Natural remedy for sunlamp tanning before UV exposure.',
      true,
      true,
      true,
      [
        { name: 'IMG_20201207_223455_979.jpg', isDefault: true },
        { name: 'SoGlamLogo.png', isDefault: false },
        { name: 'SoGlamSlogan.png', isDefault: false },
      ],
      [
        { review: 'Great', stars: 5 },
        { review: 'Great', stars: 5 },
      ]
    ),

    new Product(
      2,
      'Burburry',
      'This 100% Ntaural Perfume is rich in fine aroma that will please your senses while lasting for a lot longer than any other perfume.',
      'Solid perfume- Oud Blast',
      '20ml',
      25000,
      0,
      0,
      'Coconut Oil, Almond Oil. Cocoa Butter, Organic Beeswax, Vitamin E, Essential Oils',
      'Using your wooden stick, dip a tiny quantity of the product and apply it to pulse points such as wrists or neck, it can also be used on your hair and on sensitive areas',
      false,
      true,
      true,
      [
        { name: 'IMG_20201207_223455_979.jpg', isDefault: false },
        { name: 'SoGlamLogo.png', isDefault: true },
        { name: 'SoGlamSlogan.png', isDefault: false },
      ],
      [
        { review: 'Great', stars: 4 },
        { review: 'sucks', stars: 1 },
      ]
    ),
    new Product(
      1,
      'Mango Fizz',
      'Our famous African Oil is a 100% natural oil with no colorings or chemicals nor alcohol, it will hydrate, nourish and give glow to your skin.',
      'Solarium Oil',
      '250ml',
      50000,
      30,
      35000,
      'Carrot Oil, Avocado Oil, Almond Oil, Glycerine, Grapeseed Oil,Vitamin E, Essential Oils',
      'Shake well before use, apply it as your daily body oil or as your Natural remedy for sunlamp tanning before UV exposure.',
      true,
      true,
      true,
      [
        { name: 'IMG_20201207_223455_979.jpg', isDefault: true },
        { name: 'SoGlamLogo.png', isDefault: false },
        { name: 'SoGlamSlogan.png', isDefault: false },
      ],
      [
        { review: 'Great', stars: 5 },
        { review: 'Great', stars: 5 },
      ]
    ),

    new Product(
      2,
      'Burburry',
      'This 100% Ntaural Perfume is rich in fine aroma that will please your senses while lasting for a lot longer than any other perfume.',
      'Solid perfume- Oud Blast',
      '20ml',
      25000,
      0,
      0,
      'Coconut Oil, Almond Oil. Cocoa Butter, Organic Beeswax, Vitamin E, Essential Oils',
      'Using your wooden stick, dip a tiny quantity of the product and apply it to pulse points such as wrists or neck, it can also be used on your hair and on sensitive areas',
      false,
      true,
      true,
      [
        { name: 'IMG_20201207_223455_979.jpg', isDefault: false },
        { name: 'SoGlamLogo.png', isDefault: true },
        { name: 'SoGlamSlogan.png', isDefault: false },
      ],
      [
        { review: 'Great', stars: 4 },
        { review: 'sucks', stars: 1 },
      ]
    ),
    new Product(
      1,
      'Mango Fizz',
      'Our famous African Oil is a 100% natural oil with no colorings or chemicals nor alcohol, it will hydrate, nourish and give glow to your skin.',
      'Solarium Oil',
      '250ml',
      50000,
      30,
      35000,
      'Carrot Oil, Avocado Oil, Almond Oil, Glycerine, Grapeseed Oil,Vitamin E, Essential Oils',
      'Shake well before use, apply it as your daily body oil or as your Natural remedy for sunlamp tanning before UV exposure.',
      true,
      true,
      true,
      [
        { name: 'IMG_20201207_223455_979.jpg', isDefault: true },
        { name: 'SoGlamLogo.png', isDefault: false },
        { name: 'SoGlamSlogan.png', isDefault: false },
      ],
      [
        { review: 'Great', stars: 5 },
        { review: 'Great', stars: 5 },
      ]
    ),

    new Product(
      2,
      'Burburry',
      'This 100% Ntaural Perfume is rich in fine aroma that will please your senses while lasting for a lot longer than any other perfume.',
      'Solid perfume- Oud Blast',
      '20ml',
      25000,
      0,
      0,
      'Coconut Oil, Almond Oil. Cocoa Butter, Organic Beeswax, Vitamin E, Essential Oils',
      'Using your wooden stick, dip a tiny quantity of the product and apply it to pulse points such as wrists or neck, it can also be used on your hair and on sensitive areas',
      false,
      true,
      true,
      [
        { name: 'IMG_20201207_223455_979.jpg', isDefault: false },
        { name: 'SoGlamLogo.png', isDefault: true },
        { name: 'SoGlamSlogan.png', isDefault: false },
      ],
      [
        { review: 'Great', stars: 4 },
        { review: 'sucks', stars: 1 },
      ]
    ),
    new Product(
      1,
      'Mango Fizz',
      'Our famous African Oil is a 100% natural oil with no colorings or chemicals nor alcohol, it will hydrate, nourish and give glow to your skin.',
      'Solarium Oil',
      '250ml',
      50000,
      30,
      35000,
      'Carrot Oil, Avocado Oil, Almond Oil, Glycerine, Grapeseed Oil,Vitamin E, Essential Oils',
      'Shake well before use, apply it as your daily body oil or as your Natural remedy for sunlamp tanning before UV exposure.',
      true,
      true,
      true,
      [
        { name: 'IMG_20201207_223455_979.jpg', isDefault: true },
        { name: 'SoGlamLogo.png', isDefault: false },
        { name: 'SoGlamSlogan.png', isDefault: false },
      ],
      [
        { review: 'Great', stars: 5 },
        { review: 'Great', stars: 5 },
      ]
    ),

    new Product(
      2,
      'Burburry',
      'This 100% Ntaural Perfume is rich in fine aroma that will please your senses while lasting for a lot longer than any other perfume.',
      'Solid perfume- Oud Blast',
      '20ml',
      25000,
      0,
      0,
      'Coconut Oil, Almond Oil. Cocoa Butter, Organic Beeswax, Vitamin E, Essential Oils',
      'Using your wooden stick, dip a tiny quantity of the product and apply it to pulse points such as wrists or neck, it can also be used on your hair and on sensitive areas',
      false,
      true,
      true,
      [
        { name: 'IMG_20201207_223455_979.jpg', isDefault: false },
        { name: 'SoGlamLogo.png', isDefault: true },
        { name: 'SoGlamSlogan.png', isDefault: false },
      ],
      [
        { review: 'Great', stars: 4 },
        { review: 'sucks', stars: 1 },
      ]
    ),
    new Product(
      1,
      'Mango Fizz',
      'Our famous African Oil is a 100% natural oil with no colorings or chemicals nor alcohol, it will hydrate, nourish and give glow to your skin.',
      'Solarium Oil',
      '250ml',
      50000,
      30,
      35000,
      'Carrot Oil, Avocado Oil, Almond Oil, Glycerine, Grapeseed Oil,Vitamin E, Essential Oils',
      'Shake well before use, apply it as your daily body oil or as your Natural remedy for sunlamp tanning before UV exposure.',
      true,
      true,
      true,
      [
        { name: 'IMG_20201207_223455_979.jpg', isDefault: true },
        { name: 'SoGlamLogo.png', isDefault: false },
        { name: 'SoGlamSlogan.png', isDefault: false },
      ],
      [
        { review: 'Great', stars: 5 },
        { review: 'Great', stars: 5 },
      ]
    ),

    new Product(
      2,
      'Burburry',
      'This 100% Ntaural Perfume is rich in fine aroma that will please your senses while lasting for a lot longer than any other perfume.',
      'Solid perfume- Oud Blast',
      '20ml',
      25000,
      0,
      0,
      'Coconut Oil, Almond Oil. Cocoa Butter, Organic Beeswax, Vitamin E, Essential Oils',
      'Using your wooden stick, dip a tiny quantity of the product and apply it to pulse points such as wrists or neck, it can also be used on your hair and on sensitive areas',
      false,
      true,
      true,
      [
        { name: 'IMG_20201207_223455_979.jpg', isDefault: false },
        { name: 'SoGlamLogo.png', isDefault: true },
        { name: 'SoGlamSlogan.png', isDefault: false },
      ],
      [
        { review: 'Great', stars: 4 },
        { review: 'sucks', stars: 1 },
      ]
    ),
    new Product(
      1,
      'Mango Fizz',
      'Our famous African Oil is a 100% natural oil with no colorings or chemicals nor alcohol, it will hydrate, nourish and give glow to your skin.',
      'Solarium Oil',
      '250ml',
      50000,
      30,
      35000,
      'Carrot Oil, Avocado Oil, Almond Oil, Glycerine, Grapeseed Oil,Vitamin E, Essential Oils',
      'Shake well before use, apply it as your daily body oil or as your Natural remedy for sunlamp tanning before UV exposure.',
      true,
      true,
      true,
      [
        { name: 'IMG_20201207_223455_979.jpg', isDefault: true },
        { name: 'SoGlamLogo.png', isDefault: false },
        { name: 'SoGlamSlogan.png', isDefault: false },
      ],
      [
        { review: 'Great', stars: 5 },
        { review: 'Great', stars: 5 },
      ]
    ),

    new Product(
      2,
      'Burburry',
      'This 100% Ntaural Perfume is rich in fine aroma that will please your senses while lasting for a lot longer than any other perfume.',
      'Solid perfume- Oud Blast',
      '20ml',
      25000,
      0,
      0,
      'Coconut Oil, Almond Oil. Cocoa Butter, Organic Beeswax, Vitamin E, Essential Oils',
      'Using your wooden stick, dip a tiny quantity of the product and apply it to pulse points such as wrists or neck, it can also be used on your hair and on sensitive areas',
      false,
      true,
      true,
      [
        { name: 'IMG_20201207_223455_979.jpg', isDefault: false },
        { name: 'SoGlamLogo.png', isDefault: true },
        { name: 'SoGlamSlogan.png', isDefault: false },
      ],
      [
        { review: 'Great', stars: 4 },
        { review: 'sucks', stars: 1 },
      ]
    ),
  ];

  toggleGallerySubject = new Subject<Boolean>();
  searchProductsSubject = new ReplaySubject<{
    products: Product[];
    input: string;
  }>(1);

  getProductsList() {
    return this.products.slice();
  }

  getProduct(index: number) {
    return this.products[index];
  }

  getFilteredProductsList(searchInput: string) {
    return this.products.slice();
  }

  toggleGallery(isOpen: Boolean) {
    this.toggleGallerySubject.next(isOpen);
  }

  searchProducts(searchInput: string) {
    let searchedProd: Product[];
    searchedProd = this.products.filter(this.search(searchInput)).slice();
    this.searchProductsSubject.next({
      products: searchedProd,
      input: searchInput,
    });
  }

  search(searchInput: string) {
    return function (element: Product) {
      return (
        element.name.toLowerCase().indexOf(searchInput.toLowerCase()) >= 0 ||
        element.type.toLowerCase().indexOf(searchInput.toLowerCase()) >= 0 ||
        element.ingredients.toLowerCase().indexOf(searchInput.toLowerCase()) >=
          0
      );
    };
  }
}
