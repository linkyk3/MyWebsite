import { useState } from 'react';
import photo1 from '@assets/generated_images/photo-1.jpg';
import photo2 from '@assets/generated_images/photo-2.jpg';
import photo3 from '@assets/generated_images/photo-3.jpg';
import photo4 from '@assets/generated_images/photo-4.jpg';
import photo5 from '@assets/generated_images/photo-5.jpg';
import photo6 from '@assets/generated_images/photo-6.jpg';
import photo7 from '@assets/generated_images/photo-7.jpg';
import photo8 from '@assets/generated_images/photo-8.jpg';

const blogPosts = [
  {
    date: "2025.06.01",
    title: "On the legibility of transit maps",
    excerpt: "A short thought piece about clarity in spatial information design. Why do we prioritize topological simplicity over geographic accuracy? When does abstraction fail the rider?"
  },
  {
    date: "2025.05.14",
    title: "Waste in motion: reflections on logistics",
    excerpt: "Connecting lean manufacturing principles to urban freight. If the city is a factory, then delivery trucks are its conveyor belts. The same rules of bottlenecking apply."
  },
  {
    date: "2025.04.28",
    title: "Grid vs. radial: a false dichotomy",
    excerpt: "On urban street networks. We often contrast the American grid with the European radial city, but the most resilient systems combine both. A look at hybrid topologies."
  },
  {
    date: "2025.03.20",
    title: "The invisible infrastructure",
    excerpt: "On the underground systems cities depend on. From steam pipes to fiber optics, the physical internet that keeps the surface world legible."
  },
  {
    date: "2025.02.10",
    title: "Flow state, literally",
    excerpt: "On fluid dynamics models applied to pedestrian movement. How crowds behave like water, and how architecture can serve as a conduit or a dam."
  }
];

export default function Creations() {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [expandedBlogIndex, setExpandedBlogIndex] = useState<number | null>(null);

  const images = [photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8];

  return (
    <div className="min-h-[100dvh] w-full bg-background pt-32 pb-24 px-8 md:px-16 lg:px-24 max-w-7xl mx-auto flex flex-col gap-32">

      {/* Lightbox */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-8 cursor-pointer"
          onClick={() => setLightboxImage(null)}
          data-testid="lightbox"
        >
          <img 
            src={lightboxImage} 
            alt="Enlarged photography" 
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}

      {/* Photography Section */}
      <section className="flex flex-col gap-8">
        <h2 className="font-mono text-[10px] tracking-widest text-foreground uppercase border-b border-foreground pb-4">
          Photography / Studies
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img, i) => (
            <div 
              key={i} 
              className="aspect-square w-full overflow-hidden border border-foreground bg-foreground/5 cursor-pointer relative group"
              onClick={() => setLightboxImage(img)}
              data-testid={`photo-${i}`}
            >
              <div className="absolute inset-0 bg-black/10 group-hover:opacity-0 transition-opacity duration-300 z-10" />
              <img 
                src={img} 
                alt={`Photography study ${i+1}`}
                className="w-full h-full object-cover grayscale blur-[8px] group-hover:blur-0 group-hover:grayscale-0 transition-all duration-300 ease-out"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Blog Directory Section */}
      <section className="flex flex-col gap-8">
        <h2 className="font-mono text-[10px] tracking-widest text-foreground uppercase border-b border-foreground pb-4">
          Directory / Writing
        </h2>
        
        <div className="flex flex-col">
          {blogPosts.map((post, idx) => {
            const isExpanded = expandedBlogIndex === idx;
            return (
              <div key={idx} className="border-b border-foreground/30 py-4 flex flex-col gap-2">
                <div 
                  className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 cursor-pointer group"
                  onClick={() => setExpandedBlogIndex(isExpanded ? null : idx)}
                  data-testid={`blog-${idx}`}
                >
                  <div className="font-mono text-sm tracking-widest text-muted-foreground w-32 shrink-0">
                    {post.date}
                  </div>
                  <div className={`font-sans text-lg md:text-xl transition-colors duration-200 group-hover:text-accent ${isExpanded ? 'text-accent' : 'text-foreground'}`}>
                    {post.title}
                  </div>
                </div>
                
                <div 
                  className={`overflow-hidden transition-[max-height] duration-300 ease-out font-sans text-sm text-foreground/70 md:ml-[11rem]`}
                  style={{ maxHeight: isExpanded ? '300px' : '0px' }}
                >
                  <div className="py-2 pr-4 md:pr-12 leading-relaxed">
                    {post.excerpt}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
