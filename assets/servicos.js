// Os serviços do modelo de orçamento: o nome em inglês e as linhas de incluso e não incluso que o dono ajusta.
// Os colchetes são para o dono trocar pelo que é verdade no serviço dele.
window.SERVICOS = {
  house_cleaning: {
    about: "a house cleaning",
    your: "house cleaning",
    pt: "Faxina de casa (padrão)",
    en: "Standard house cleaning",
    included: [
      "Kitchen: counters, sink, stovetop, outside of the appliances, floor",
      "Bathrooms: toilet, tub and shower, sink, mirrors, floor",
      "Bedrooms and living areas: dusting the surfaces we can reach, vacuuming, mopping hard floors",
      "Trash taken out and bags replaced",
      "Cleaning products and equipment"
    ],
    excluded: ["Inside the oven and the fridge", "Inside cabinets and drawers", "Windows", "Laundry and dishes", "Carpet shampoo"]
  },
  deep_cleaning: {
    about: "a deep cleaning",
    your: "deep cleaning",
    pt: "Faxina pesada (deep cleaning)",
    en: "Deep cleaning",
    included: [
      "Kitchen, bathrooms, bedrooms and living areas: every surface we can reach, floors vacuumed and mopped",
      "Baseboards, door frames, light switches and outlet covers",
      "Inside the microwave",
      "Cabinet fronts and handles",
      "Window sills and tracks",
      "Light fixtures and ceiling fans we can reach safely",
      "Cleaning products and equipment"
    ],
    excluded: ["Inside the oven and the fridge (available for $[30] each)", "Outside windows", "Carpet shampoo", "Mold removal"]
  },
  move_out: {
    about: "a move-out cleaning",
    your: "move-out cleaning",
    pt: "Faxina de mudança (move-in / move-out)",
    en: "Move-out cleaning",
    included: [
      "Every room top to bottom, empty house",
      "Inside cabinets, drawers and closets",
      "Inside the oven, the fridge and the microwave",
      "Baseboards, doors, light switches and outlet covers",
      "Bathrooms scrubbed, including grout we can reach",
      "Windows on the inside, sills and tracks",
      "Cleaning products and equipment"
    ],
    excluded: ["Wall repair or touch-up paint", "Carpet shampoo", "Hauling away items left in the house", "Outside windows"]
  },
  post_construction: {
    about: "a post-construction cleaning",
    your: "post-construction cleaning",
    pt: "Limpeza pós-obra",
    en: "Post-construction cleaning",
    included: [
      "Construction dust removed from every surface, top to bottom",
      "Floors vacuumed and mopped",
      "Windows, sills and tracks on the inside",
      "Stickers and paint drops removed from glass and fixtures",
      "Cabinets and drawers wiped inside and out",
      "Bathrooms and kitchen cleaned and ready to use"
    ],
    excluded: ["Hauling construction debris", "Outside windows", "Pressure washing", "Paint touch-ups"]
  },
  interior_painting: {
    about: "interior painting",
    your: "painting job",
    pt: "Pintura interna",
    en: "Interior painting",
    included: [
      "Moving and covering furniture, covering floors",
      "Patching small holes and cracks",
      "Two coats on [walls, ceilings and trim] in [rooms]",
      "Paint and materials: [brand], [finish]",
      "Cleanup at the end of every day"
    ],
    excluded: ["Drywall repair bigger than [a fist]", "Wallpaper removal", "Moving pianos, safes or electronics", "Color changes after we start"]
  },
  exterior_painting: {
    about: "exterior painting",
    your: "painting job",
    pt: "Pintura externa",
    en: "Exterior painting",
    included: [
      "Pressure washing the surfaces we paint",
      "Scraping loose paint and sanding the edges",
      "Caulking gaps around windows and trim",
      "Two coats on [siding, trim and doors]",
      "Paint and materials: [brand], [finish]",
      "Covering plants, walkways and windows, and cleanup"
    ],
    excluded: ["Replacing rotten wood (priced before we touch it)", "Painting the deck or the fence", "Gutters"]
  },
  lawn_care: {
    about: "lawn care",
    your: "lawn visit",
    pt: "Grama e jardim (lawn care)",
    en: "Lawn care",
    included: [
      "Mowing the front and back lawn",
      "Edging along walkways and the driveway",
      "Trimming around beds, trees and the fence",
      "Blowing clippings off walkways, driveway and patio",
      "Visits: [every week], from [April] to [October]"
    ],
    excluded: ["Leaf cleanup", "Fertilizer and weed control", "Hedge trimming", "Hauling yard waste"]
  },
  handyman: {
    about: "the repairs",
    your: "repair visit",
    pt: "Reparos (handyman)",
    en: "Handyman work",
    included: [
      "[Job 1]",
      "[Job 2]",
      "[Job 3]",
      "Basic materials: [screws, anchors, caulk]",
      "Cleanup and haul-away of the small debris"
    ],
    excluded: ["Electrical or plumbing work that needs a license", "Parts you pick (we install them)", "Anything not on this list without your OK first"]
  },
  remodeling: {
    about: "your remodel",
    your: "visit",
    pt: "Reforma",
    en: "Remodeling",
    included: [
      "Demolition of [what comes out]",
      "[Main work, step by step]",
      "Materials: [list, with brand and model]",
      "Permits: [we pull them / not needed]",
      "Daily cleanup and final cleanup"
    ],
    excluded: ["Changes after the work starts (priced in writing first)", "Problems hidden behind walls (we stop and show you before any extra)", "Furniture moving"]
  },
  other: {
    about: "[the service]",
    your: "[service]",
    pt: "Outro serviço",
    en: "[Service name]",
    included: ["[What you do, step 1]", "[What you do, step 2]", "[What you do, step 3]", "[Materials included]", "Cleanup when we're done"],
    excluded: ["[What isn't included]", "[What costs extra]"]
  }
};
// O ofício de cada serviço: a capa e o exemplo do capítulo de venda (playbook.js), e a ocupação do salário no BLS (mercado.js)
window.SERVICO_OFICIO = {
  house_cleaning: ["cleaning", "faxina"], deep_cleaning: ["cleaning", "faxina"], move_out: ["cleaning", "faxina"], post_construction: ["cleaning", "faxina"],
  interior_painting: ["painting", "pintor"], exterior_painting: ["painting", "pintor"], lawn_care: ["lawn", "paisagismo"],
  handyman: ["handyman", ""], remodeling: ["handyman", ""], other: ["other", ""]
};
