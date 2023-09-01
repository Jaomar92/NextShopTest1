import Link from "next/link";
import footerClassNames from "./footerClassName";

const Footer = () => {
  const {
    footer,
    container,
    section,
    sectionLink,
    section1,
    section1Heading,
    section1Content,
    section2,
    section2Heading,
    section2Content,
    section2ul,
    section3,
    section3Heading,
    section3Content,
  } = footerClassNames;
  return (
    <>
      <div className={footer}>
        <div className={container}>
          <div className={section}>
            <section className={section1}>
              <h2 className={section1Heading}>Logo</h2>
              <p className={section1Content}> This is on the footer</p>
            </section>
            <section className={section2}>
              <h2 className={section2Heading}>About Us</h2>
              <ul className={section2ul}>
                <li>
                  <Link href="#" className={sectionLink}>
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className={sectionLink}>
                    Blog
                  </Link>
                </li>
              </ul>
            </section>
            <section className={section3}>
              <h2 className={section3Heading}>Contact Us</h2>
              <p className={section3Content}>This is our Email</p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
