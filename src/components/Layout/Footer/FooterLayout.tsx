import React, { FC } from "react";

// import "@mozilla-protocol/core/protocol/css/protocol.css";
interface Link {
  label: string;
  url: string;
}

interface Header {
  links: Link[];
  headerName: string;
}

export interface FooterLayoutProps {
  /**The links that go in the footer
   * example link object: {
   *    about: <string>
   *    aboutLinkDestination: <string>
   *    headers: [
   *            {
   *              headerName: "City of Seattle",
   *              links: Link[]
   *          }
   *    ]
   * }
   */
  headers: Header[];
  about: string;
  aboutLinkDestination: string;
}

function renderHeader(header: Header) {
  return (
    <section className="mzp-c-footer-section">
      <h5 className="mzp-c-footer-heading">{header.headerName}</h5>
      <ul className="mzp-c-footer-list">
        {header.links.map((link) => {
          return (
            <li>
              <a href={link.url}>{link.label}</a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

const FooterLayout: FC<FooterLayoutProps> = ({
  headers,
  about,
  aboutLinkDestination,
}: FooterLayoutProps) => {
  return (
    <footer className="mzp-c-footer">
      <div className="mzp-l-content">
        <div className="mzp-c-footer-sections">
          {headers.map((header: Header) => {
            return renderHeader(header);
          })}
        </div>
      </div>
    </footer>
  );
};

export default FooterLayout;
