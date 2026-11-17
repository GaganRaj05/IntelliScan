import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";

const FAQ = [
  { q: "Is Pixel a medical diagnosis?", a: "No. Pixel is a decision-support tool. A qualified radiologist or physician must confirm any finding." },
  { q: "What kind of images does it accept?", a: "Brain MRI slices as PNG or JPG. Clear, uncropped images give the best results." },
  { q: "Is my scan stored?", a: "In this demo, no. The image stays in your browser and is never uploaded." },
  { q: "How accurate is it?", a: "Accuracy depends on image quality and the data the model was trained on. Results show a confidence score so you can judge how much weight to give them." },
];

const Faq = () => (
  <section className="section section--narrow" id="faq">
    <h2 className="section__title">Questions, answered.</h2>
    <Accordion.Root type="single" collapsible className="faq">
      {FAQ.map((f) => (
        <Accordion.Item key={f.q} value={f.q} className="faq__item">
          <Accordion.Header>
            <Accordion.Trigger className="faq__trigger">
              {f.q}<Plus size={20} aria-hidden="true" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="faq__content"><p>{f.a}</p></Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  </section>
);

export default Faq;
