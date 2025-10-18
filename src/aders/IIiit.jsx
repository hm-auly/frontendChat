const listA = ["Investors", "Features", "Book a demo", "Security"];
const listB = ["Credit Cards", "Gift Cards", "Savings Accounts", "NFT"];
const listC = ["Free rewards", "Documentation", "Affiliate program"];
const listD = ["Changelog", "License", "Site Maps", "News"];

const linkList = (title, list) => (
    <div>
        <h3 className="text-md font-bold py-1">{title}</h3>

        <ul>
            {list.map((item, i) => (
                <li key={i} className="py-1 text-secondary">
                    {item}
                </li>
            ))}
        </ul>
    </div>
) 

function IIiit() {
  return (
     <>
        <section className="md:px-24 px-5 my-24 py-5  bg-[#2928343D] backdrop-blur-sm">
            <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-6 text-center md:text-start">
                <div className="col-span-2">
                   <div className="flex gap-3 items-center pb-3 justify-center md:justify-start">
                        <img  src="/Images/Exclude.svg" alt="" />
                        <h5 className="font-bold">Wern Finance</h5>
                    </div>
                    <p className="max-w-sm text-secondary text-center md:text-start">Discover the power of our secure and rewarding credit cards</p>
                </div>
                {linkList("About Us", listA)}
                {linkList("Peoducts", listB)}
                {linkList("Useful Links", listC)}
                {linkList("Social", listD)}
            </div>
        </section>
     </>
  )
}

export default IIiit