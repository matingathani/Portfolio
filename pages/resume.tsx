import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Layout from "../components/Layout";
import { resume } from "../data/resume";
import { ButtonPrimary, ButtonSecondary, Card, Container, PageSection, SectionHeader } from "../components/ui";
import styled from "styled-components";
import { pdfjs } from "react-pdf";
import { trackEvent } from "../utils/analytics";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

const Document = dynamic(() => import("react-pdf").then((mod) => mod.Document), { ssr: false });
const Page = dynamic(() => import("react-pdf").then((mod) => mod.Page), { ssr: false });

if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
}

const ViewerWrapper = styled(Card)`
  display: grid;
  gap: 1.5rem;
  overflow: hidden;

  .react-pdf__Page {
    display: flex;
    justify-content: center;
  }

  canvas {
    max-width: 100% !important;
    height: auto !important;
    border-radius: ${props => props.theme.shapes.borderRadiusSmall};
  }
`;

const InlineButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const Resume = () => {
  const [numPages, setNumPages] = useState<number>(1);
  const [isMobile, setIsMobile] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const onLoadSuccess = ({ numPages: total }: { numPages: number }) => {
    setLoadError(null);
    setNumPages(total);
  };

  return (
    <Layout>
      <PageSection>
        <Container>
          <SectionHeader>
            <h1>Resume</h1>
            <p>Inline PDF viewer plus a downloadable copy for recruiters.</p>
          </SectionHeader>

          <ViewerWrapper>
            <InlineButtons>
              <ButtonPrimary
                href="/MatinGathaniResume2026.pdf"
                download="MatinGathaniResume2026.pdf"
                onClick={() => trackEvent("resume_download")}
              >
                Download Resume
              </ButtonPrimary>
              <ButtonSecondary href={`mailto:${resume.contact.email}`}>Email Me</ButtonSecondary>
            </InlineButtons>

            {isMobile ? (
              <p style={{ color: "rgba(255,255,255,0.7)" }}>
                PDF preview is optimized for desktop. Please use the download button above on mobile.
              </p>
            ) : (
              <>
                {loadError && <p style={{ color: "rgba(255,255,255,0.7)" }}>{loadError}</p>}
                {!loadError && (
                  <Document
                    file="/MatinGathaniResume2026.pdf"
                    onLoadSuccess={onLoadSuccess}
                    onLoadError={() => setLoadError("Failed to load PDF file. Please use the download button above.")}
                    loading={<p>Loading resume…</p>}
                  >
                    {Array.from({ length: numPages }, (_, index) => (
                      <Page key={`page_${index + 1}`} pageNumber={index + 1} scale={1.2} />
                    ))}
                  </Document>
                )}
              </>
            )}
          </ViewerWrapper>
        </Container>
      </PageSection>
    </Layout>
  );
};

export default Resume;
