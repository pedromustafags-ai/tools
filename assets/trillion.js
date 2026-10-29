// A lista do TRILLION (anúncio 01 do lote 1, 17/10/2026): os negócios de serviço que mais ganham com a aposta da Sequoia
// ("Services: The New Software", Julien Bek, 05/03/2026) e a primeira coisa a mudar no do dono.
// A tese aplicada ao serviço está em conteudo/servico-pedro/2026-10-15-dor-latente-e-servico/C-sequoia-aplicada.md.
// As tarefas por ofício e a leitura da rua principal são leitura nossa dos três testes do artigo, nunca medida.
window.TRILLION = (function () {
  var R = {};

  // O trabalho em volta do serviço que o cliente ainda faz sozinho, por ofício, na ordem em que vale passar primeiro:
  // o que se repete e segue regra vem antes do que pede julgamento.
  R.TAREFAS = {
    cleaning: [
      ["booking", "Remembering to book the next cleaning", "Your next visit is booked before we leave, and we text you the day before.", "It repeats on a schedule, so once it's yours, the customer never has to think about you to keep buying."],
      ["restock", "Restocking soap, paper towels and trash bags", "Supplies included: we restock soap, paper towels and trash bags at every visit.", "Customers notice it the day they run out, and it turns the visit into a house that's finished."],
      ["linens", "Washing and changing the bed linens", "Fresh sheets: we strip, wash and remake the beds while we're there.", "It's the chore that's left after the cleaners leave, and it fits inside the time you're already in the house."],
      ["fridge", "Clearing out the fridge", "Fridge clear-out every other visit: old food out, shelves wiped.", "Nobody wants to do it, and it's easy to check: the customer opens the door and sees it."],
      ["moveout", "Getting a place ready for the move-out inspection", "Move-out ready: we clean to the landlord's checklist and send you dated photos.", "The deposit is on the line, so the customer is buying the result, and the photos let them check it."]
    ],
    hvac: [
      ["tuneup", "Remembering the yearly tune-up", "We book your tune-up every spring and fall, and remind you the week before.", "It follows the calendar, and a booked visit is the start of a maintenance plan."],
      ["filters", "Changing the air filters", "Filter changes included: we bring the right size and swap them every season.", "Most customers don't know their filter size, so a small job becomes a reason to come back."],
      ["warranty", "Registering the warranty after an install", "We register your warranty the day we install, and send you the confirmation.", "It's paperwork with a deadline, and customers find out they missed it when something breaks."],
      ["records", "Keeping the service records", "Every visit goes into one service record you can hand to a buyer when you sell.", "It costs you a few minutes a visit and gives the customer something they can't get from a new company."],
      ["compare", "Comparing repair against replacement", "Repair or replace: you get both prices side by side, with what each one includes.", "It's the decision customers put off, and laying it out in writing gets them to decide."]
    ],
    lawn: [
      ["cleanup", "Booking the spring and fall cleanups", "Spring and fall cleanups are on the calendar from day one.", "They come every year, so booking them up front turns a mowing customer into a year-round one."],
      ["sprinklers", "Changing the sprinkler schedule with the season", "We adjust your sprinkler schedule as the weather changes.", "It follows a rule, and customers usually leave it on the summer setting until something dies."],
      ["notes", "Keeping track of what was done", "After every visit you get a photo and a two-line note.", "It lets the customer check the work without being home, which is what a finished job looks like."],
      ["plants", "Buying plants, mulch and soil", "Plants and mulch included: we pick them, buy them and bring them.", "It saves the customer a trip, and you know what grows in their yard."],
      ["debris", "Hauling away clippings and branches", "We take the clippings and branches with us.", "It's the last chore of the day, and the yard looks finished when you leave."]
    ],
    painting: [
      ["prep", "Patching holes and cracks before painting", "Prep included: holes and cracks patched before the first coat.", "It's part of a finish the customer can see, and leaving it to them shows in the result."],
      ["furniture", "Moving furniture and covering the floors", "We move the furniture, cover the floors and put everything back.", "It's the work customers dread most, and it's the first thing they mention when they recommend you."],
      ["paint", "Buying the paint", "We buy the paint and leave the leftover labeled for touch-ups.", "One less trip for the customer, and the right color is on hand next year."],
      ["touchups", "Touch-ups a year later", "One touch-up visit within a year, booked now.", "It brings you back into the house, where the next room usually comes up."],
      ["colors", "Picking the colors", "Color help included: we paint sample patches on your wall before you choose.", "It's the decision that stalls most jobs, and helping with it moves the start date up."]
    ],
    handyman: [
      ["maintenance", "Remembering seasonal home maintenance", "A seasonal visit for the small things: gutters, caulk, filters, on the calendar.", "It repeats every season, which turns one-off jobs into a customer who stays."],
      ["punchlist", "Writing the list of what needs fixing", "Walk-through included: we write the list with you and price it item by item.", "Customers know something's wrong before they know what, and the list turns that into a job."],
      ["haul", "Hauling away the debris", "Cleanup and haul-away included.", "The job isn't finished in the customer's eyes until the mess is gone."],
      ["materials", "Buying the materials", "We buy the materials and give you the receipts.", "It saves the customer a store trip, and the job starts with the right parts."],
      ["permits", "Figuring out permits", "We check whether you need a permit and handle the paperwork.", "It's the part customers are afraid of getting wrong, so taking it on is worth paying for."]
    ],
    other: [
      ["reminders", "Remembering when they need you again", "We remind you when it's time again.", "It follows the calendar, and it's how a one-time customer comes back."],
      ["booking", "Booking and rescheduling", "Book and reschedule by text, any time.", "It's rule-following work, and customers pick whoever makes it easy."],
      ["paperwork", "Keeping the paperwork and receipts", "Every receipt and record in one place, sent after each job.", "It's a small chore with a big payoff the day the customer needs it."],
      ["checkin", "Checking the result afterwards", "We check in a week later to make sure everything's right.", "It catches a problem before it turns into a bad review."],
      ["compare", "Comparing options before deciding", "You get two options side by side, with what each one includes.", "Customers who can't decide go quiet, and laying it out gets them to say yes."]
    ]
  };

  // A rua principal: os três testes do artigo, lidos por nós para negócios locais. ● forte, ◐ em parte, ○ fraco.
  R.RUA = [
    ["Bookkeeping and tax prep", "●", "●", "●", "Named in the article: owners outsource the tax work no single in-house person can cover."],
    ["IT support for small offices", "●", "●", "●", "Named in the article: every small business outsources its IT."],
    ["Insurance agencies", "●", "●", "◐", "Insurance brokerage tops the article's map."],
    ["Cleaning", "●", "●", "●", "Recurring visits, a routine around the job, and a result the customer sees the same day."],
    ["Lawn and landscaping", "●", "●", "●", "Recurring visits on a seasonal schedule."],
    ["HVAC, plumbing and electrical", "●", "◐", "●", "Maintenance follows the calendar; diagnosing and repairs take judgement."],
    ["Painting", "●", "◐", "●", "Prep and logistics follow rules; colors and finish take taste."],
    ["Handyman and remodeling", "●", "○", "◐", "Each job is different, so most of the work is judgement."]
  ];

  R.FERRAMENTAS = { "0-2": "0 to 2", "3-5": "3 to 5", "6+": "6 or more" };
  R.COMPRA = { job: "One job at a time", mix: "A mix of one-off jobs and repeat visits", plan: "Mostly on a plan or a schedule" };

  R.check = function (i) {
    if (!i || !R.TAREFAS[i.trade]) return "Pick the kind of work you do.";
    if (!Array.isArray(i.tasks)) return "Pick what your customers still do themselves.";
    if (!R.FERRAMENTAS[i.tools]) return "Pick how many apps and tools you pay for.";
    if (!R.COMPRA[i.plan]) return "Pick how most customers buy from you.";
    return "";
  };

  R.calc = function (i) {
    var lista = R.TAREFAS[i.trade];
    var ainda = lista.filter(function (t) { return i.tasks.indexOf(t[0]) >= 0; });
    var primeira = ainda[0] || lista[0];
    return {
      lista: lista,
      ainda: ainda,
      n: ainda.length,
      nenhuma: !ainda.length,
      primeira: { key: primeira[0], label: primeira[1], linha: primeira[2], porque: primeira[3] }
    };
  };

  // a leitura do resultado: o que a forma de comprar e o número de ferramentas dizem sobre o negócio dele
  R.leitura = function (i, r) {
    var t = r.primeira.label.charAt(0).toLowerCase() + r.primeira.label.slice(1);
    if (r.nenhuma) return "Your customers already hand you most of the work around the job. The next step is the one in this report: " + t + ", sold as part of a plan instead of a favor.";
    if (i.plan === "job") return "You sell one job at a time, and your customers still do " + r.n + " of these themselves. Start with " + t + ": it's the one that brings them back without a new sale.";
    if (i.plan === "plan") return "You already sell on a schedule. Add " + t + " to the plan, and the price of the plan has a reason to go up.";
    return "Some of your customers already come back. Put " + t + " into every repeat visit, and the one-off customers have a reason to become repeat ones.";
  };

  R.ferramentasFrase = {
    "0-2": "You run the business on very few tools, so the customer pays you for the work and not for software you manage.",
    "3-5": "Three to five tools means three to five logins someone has to keep up, usually you.",
    "6+": "Six or more tools means a second job running them. The money in this report is in the work, so cut the tool nobody opens before you add one."
  };

  return R;
})();
