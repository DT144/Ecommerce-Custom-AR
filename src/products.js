const products = {
  tvs: [
    {
      id: 'tv1',
      name: 'Samsung 138 cm (55 inches) DU8300 Crystal 4K UHD Smart TV',
      price: 58990,
      image: 'samsung-tv.jpg', // Replace with your image
      model: 'samsung-tv.glb', // Replace with your 3D model
      description: `
        Samsung 138 cm (55 inches) DU8300 Crystal 4K UHD Smart TV with Crystal Processor 4K (UA55DU8300) (2024 Model Edition)
        <ul>
          <li>Crystal Processor 4K: Upscale every content to 4K resolution</li>
          <li>PurColor: Fine tuned color for a vibrant, lifelike picture</li>
          <li>Smart Hub: Discover your favorite movies, TV shows, games and ambient screens all in one place</li>
          <li>Multiple Voice Assistants: Choose your favorite voice assistant; Bixby, Amazon Alexa or Google Assistant</li>
          <li>Motion Xcelerator: Experience smooth action and clear motion</li>
        </ul>
      `,
      features: [
        'Crystal Processor 4K',
        'PurColor',
        'Smart Hub',
        'Multiple Voice Assistants',
        'Motion Xcelerator',
        '4K UHD Resolution',
      ],
      specifications: {
        screenSize: '138 cm (55 inches)',
        resolution: '4K UHD (3840 x 2160)',
        processor: 'Crystal Processor 4K',
        smartTV: 'Yes',
        voiceControl: 'Bixby, Alexa, Google Assistant',
      },
    },
  ],
};

export default products;