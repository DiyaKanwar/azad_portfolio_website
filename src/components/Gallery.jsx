import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import galleryData from './Gallary_data/data'; // Ensure this path is correct
import {
  FaTimes,
  FaImage,
  FaExpand,
  FaChevronLeft,
  FaChevronRight,
  FaSearchPlus,
  FaSearchMinus,
} from 'react-icons/fa';

// --- Utility Hooks ---

/**
 * Custom hook for Intersection Observer.
 * @param {Object} options - Options for Intersection Observer.
 * @returns {[React.RefObject, boolean]} - Tuple containing the target ref and isIntersecting boolean.
 */
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold: 0.1, // Trigger when 10% of the target is visible
        rootMargin: '50px', // Start loading 50px before entering viewport
        ...options,
      }
    );

    const currentTarget = targetRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [options]);

  return [targetRef, isIntersecting];
};

// --- Components ---

/**
 * GalleryImage component with lazy loading and hover effects.
 * @param {Object} props - Component props.
 * @param {Object} props.img - Image data object.
 * @param {number} props.idx - Index of the image.
 * @param {function} props.onClick - Click handler for the image.
 */
const GalleryImage = React.memo(({ img, idx, onClick }) => {
  const [targetRef, isVisible] = useIntersectionObserver();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const { src, alt, category, title } = img;

  const handleClick = useCallback(() => {
    onClick(img, idx);
  }, [img, idx, onClick]);

  const altText = alt || `Gallery image ${idx + 1}`;

  return (
    <div
      ref={targetRef}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View image: ${title || altText}`}
      className="group cursor-pointer relative overflow-hidden rounded-xl bg-gray-900/70 shadow-inner shadow-gray-950/30 transition-all duration-500 hover:shadow-xl hover:shadow-amber-500/20 hover:scale-[1.015] hover:ring-2 hover:ring-amber-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500/75"
    >
      <div className="aspect-[4/3] overflow-hidden">
        {/* Loading / Error states */}
        {(!isVisible || (!isLoaded && !hasError)) && (
          <div className="w-full h-full bg-gray-800/60 animate-pulse flex items-center justify-center">
            <FaImage className="text-gray-500 text-2xl" />
          </div>
        )}

        {hasError && isVisible && (
          <div className="w-full h-full bg-gray-800/60 flex items-center justify-center">
            <span className="text-gray-500 text-sm">Error loading image</span>
          </div>
        )}

        {isVisible && !hasError && (
          <img
            src={src}
            alt={altText}
            className={`w-full h-full object-contain bg-transparent group-hover:scale-[1.03] transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setIsLoaded(true)}
            onError={() => {
              setHasError(true);
              setIsLoaded(false);
            }}
            loading="lazy"
            decoding="async"
          />
        )}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-between p-4">
        <div className="text-white">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
            {category}
          </span>
          <h3 className="text-sm font-semibold mt-1 line-clamp-2">{title}</h3>
        </div>
        <div className="bg-black/40 backdrop-blur-sm p-2 rounded-full border border-white/20">
          <FaExpand className="text-white text-sm" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
});

/**
 * VirtualizedGrid component for efficient rendering of large image lists.
 * @param {Object} props - Component props.
 * @param {Array<Object>} props.images - Array of image data objects.
 * @param {function} props.onImageClick - Callback when an image is clicked.
 * @param {number} [props.columns=4] - Number of columns in the grid.
 * @param {number} [props.itemHeight=280] - Estimated height of each grid item.
 */
const VirtualizedGrid = React.memo(({ images, onImageClick, columns = 4, itemHeight = 280 }) => {
  const containerRef = useRef(null);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 0 });
  const totalRows = Math.ceil(images.length / columns);

  const calculateVisibleRange = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollTop, clientHeight } = container;

    const startRow = Math.floor(scrollTop / itemHeight);
    const endRow = Math.min(
      startRow + Math.ceil(clientHeight / itemHeight) + 2,
      totalRows
    );

    const start = Math.max(0, startRow * columns);
    const end = Math.min(endRow * columns, images.length);

    setVisibleRange(prevRange => {
      if (prevRange.start !== start || prevRange.end !== end) {
        return { start, end };
      }
      return prevRange;
    });
  }, [images.length, columns, itemHeight, totalRows]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    calculateVisibleRange();
     let frame = null;
 container.addEventListener('scroll', () => {
   if (frame) cancelAnimationFrame(frame);
   frame = requestAnimationFrame(calculateVisibleRange);
 }, { passive: true });

    return () => {
     container.removeEventListener('scroll', onScroll);

    };
  }, [calculateVisibleRange]);

  const { start, end } = visibleRange;
  const visibleImages = useMemo(() => images.slice(start, end), [images, start, end]);
  useEffect(() => {
  const preload = images.slice(end, end + columns * 2);
  preload.forEach(({ src }) => {
    const img = new Image();
    img.src = src;
  });
}, [end, images, columns]);

  const offsetY = Math.floor(start / columns) * itemHeight;

 const isSmall = typeof window !== 'undefined' && window.innerWidth < 640;

if (isSmall) {
  return (
    <div className="overflow-y-auto gallery-scrollbar pr-2" style={{ maxHeight: '80vh' }}>
      <div className="grid grid-cols-2 gap-4 p-2">
        {images.map((img, idx) => (
          <GalleryImage
            key={`${img.categoryIndex}-${img.imageIndex}-${idx}`}
            img={img}
            idx={idx}
            onClick={onImageClick}
          />
        ))}
      </div>
    </div>
  );
}

return (
  <div
    ref={containerRef}
    className="h-[600px] overflow-y-auto gallery-scrollbar pr-2"
    role="grid"
    aria-rowcount={totalRows}
  >
    <div style={{ height: totalRows * itemHeight, position: 'relative' }}>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        style={{
          transform: `translateY(${offsetY}px)`,
          position: 'absolute',
          width: '100%',
          top: 0,
          left: 0,
        }}
        role="rowgroup"
      >
        {visibleImages.map((img, index) => (
          <GalleryImage
            key={`${img.categoryIndex}-${img.imageIndex}`}
            img={img}
            idx={start + index}
            onClick={onImageClick}
          />
        ))}
      </div>
    </div>
  </div>
);

});


/**
 * ImageModal component for displaying a full-screen image.
 * @param {Object} props - Component props.
 * @param {Object} props.image - Current image data.
 * @param {number} props.index - Current image index.
 * @param {number} props.totalImages - Total number of images.
 * @param {function} props.onClose - Function to close the modal.
 * @param {function} props.onNext - Function to navigate to the next image.
 * @param {function} props.onPrev - Function to navigate to the previous image.
 * @param {function} props.onZoomIn - Function to zoom in.
 * @param {function} props.onZoomOut - Function to zoom out.
 * @param {number} props.zoomLevel - Current zoom level.
 * @param {Object} props.imagePosition - Current image position {x, y}.
 * @param {function} props.onImageMouseDown - Mouse down handler for image dragging.
 * @param {function} props.handleMouseMove - Mouse move handler for image dragging (from parent).
 * @param {function} props.handleMouseUp - Mouse up handler for image dragging (from parent).
 * @param {boolean} props.isDragging - Whether the image is currently being dragged (from parent).
 */
const ImageModal = React.memo(({
  image,
  index,
  totalImages,
  onClose,
  onNext,
  onPrev,
  onZoomIn,
  onZoomOut,
  zoomLevel,
  imagePosition,
  onImageMouseDown,
  handleMouseMove,
  handleMouseUp,
  isDragging,
}) => {
  if (!image) return null;

  // For touch swipe
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const swipeThreshold = 50; // Pixels to trigger a swipe

  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e) => {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const deltaX = endX - touchStartX.current;
    const deltaY = endY - touchStartY.current;

    // Determine if it was a significant horizontal swipe and not mostly vertical
    if (Math.abs(deltaX) > swipeThreshold && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        onPrev();
      } else {
        onNext();
      }
    }
  }, [onPrev, onNext]);


  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label={`Image detail for ${image.title || image.alt}`}
      onClick={onClose}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart} // Added touch handlers
      onTouchEnd={handleTouchEnd}     // Added touch handlers
      // No onTouchMove needed here as it's for drag, not swipe
    >
      {/* Header */}
      <div className="relative z-60 bg-gradient-to-b from-black/90 to-transparent p-4 md:p-6 flex-shrink-0">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="text-white flex-grow mr-4">
            <h3 className="text-lg md:text-xl font-semibold line-clamp-1" id="modal-image-title">{image.title}</h3>
            <p className="text-gray-300 text-sm capitalize opacity-75">{image.category}</p>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              className="hidden md:inline-flex bg-black/60 hover:bg-black/80 p-3 rounded-full text-white hover:text-amber-400 border border-white/20 hover:border-amber-500/50 transition-all focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-75"
              aria-label="Previous image"
            >
              <FaChevronLeft />
            </button>
            <span className="text-sm text-white font-mono min-w-[50px] text-center" aria-live="polite">
              {index + 1} / {totalImages}
            </span>
            <button
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              className="hidden md:inline-flex bg-black/60 hover:bg-black/80 p-3 rounded-full text-white hover:text-amber-400 border border-white/20 hover:border-amber-500/50 transition-all focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-75"
              aria-label="Next image"
            >
              <FaChevronRight />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              className="bg-black/60 hover:bg-red-600/80 p-3 rounded-full text-white border border-white/20 hover:border-red-500/50 transition-all focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
              aria-label="Close modal"
            >
              <FaTimes />
            </button>
          </div>
        </div>
      </div>

      {/* Image Viewport */}
      <div
        className="flex-grow flex items-center justify-center p-4 md:p-6 overflow-hidden relative" // Added relative here for arrow positioning
        onClick={(e) => e.stopPropagation()}
      >
        {/* On-screen Left Arrow */}
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-0 inset-y-0 flex items-center px-2 sm:px-4 text-white text-2xl bg-black/50 hover:bg-black/75 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-75 z-10"
          aria-label="Previous image"
        >
          <FaChevronLeft />
        </button>

        <div
          className="relative overflow-hidden w-full h-full max-w-full max-h-full flex items-center justify-center"
          style={{ cursor: zoomLevel > 1 ? 'grab' : 'default' }}
        >
          <img
            src={image.src}
            alt={image.alt || `Zoomed view of ${image.title}`}
            className="object-contain transition-transform duration-200 ease-out"
            style={{
              transform: `scale(${zoomLevel}) translate(${imagePosition.x / zoomLevel}px, ${imagePosition.y / zoomLevel}px)`,
              maxWidth: zoomLevel > 1 ? 'none' : '100%',
              maxHeight: zoomLevel > 1 ? 'none' : '100%',
              width: 'auto',
              height: 'auto',
              filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.7))',
              cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in',
            }}
            onMouseDown={(e) => { e.stopPropagation(); onImageMouseDown(e); }}

            onDoubleClick={zoomLevel > 1 ? onZoomOut : onZoomIn}
            draggable={false}
            role="img"
            aria-describedby="modal-image-title"
          />
        </div>

        {/* On-screen Right Arrow */}
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-0 inset-y-0 flex items-center px-2 sm:px-4 text-white text-2xl bg-black/50 hover:bg-black/75 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-75 z-10"
          aria-label="Next image"
        >
          <FaChevronRight />
        </button>
      </div>
      {/* Footer / Instructions */}
      <div className="relative z-60 bg-gradient-to-t from-black/90 to-transparent p-4 md:p-6 flex-shrink-0">
        <div className="flex justify-center mb-4">
          <div className="bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 flex items-center space-x-4">
            <button
              onClick={(e) => { e.stopPropagation(); onZoomOut(); }}
              className="text-white/70 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-75"
              disabled={zoomLevel <= 0.5}
              aria-label="Zoom out"
            >
              <FaSearchMinus className="text-xl" />
            </button>
            <span className="text-white/70 text-sm font-mono">{Math.round(zoomLevel * 100)}%</span>
            <button
              onClick={(e) => { e.stopPropagation(); onZoomIn(); }}
              className="text-white/70 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-75"
              disabled={zoomLevel >= 3}
              aria-label="Zoom in"
            >
              <FaSearchPlus className="text-xl" />
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
            <span className="text-white/70 text-sm">
              ✨ Double-click or scroll to zoom • Drag to move • ESC to close • Arrows to navigate • Swipe to navigate
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});


// Main Gallery Component
const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });

  // Flatten image data from categories
  const flattenedImages = useMemo(() => {
    const images = [];
    galleryData.forEach((categoryData, categoryIndex) => {
      categoryData.images.forEach((imageSrc, imageIndex) => {
        images.push({
          src: imageSrc,
          alt: `${categoryData.title} - Image ${imageIndex + 1}`,
          category: categoryData.category,
          title: categoryData.title,
          categoryIndex,
          imageIndex,
        });
      });
    });
    return images;
  }, []);

  const filteredImages = useMemo(() => {
    if (selectedCategory === 'all') return flattenedImages;
    return flattenedImages.filter((img) => img.category === selectedCategory);
  }, [flattenedImages, selectedCategory]);

  const categories = useMemo(() => {
    const uniqueCategories = new Set();
    galleryData.forEach(({ category }) => {
      uniqueCategories.add(category);
    });
    return ['all', ...Array.from(uniqueCategories)];
  }, []);

  // Event handlers for modal
  const handleImageClick = useCallback((image, index) => {
    setSelectedImage(image);
    setSelectedIndex(index);
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
    document.body.style.overflow = 'hidden';
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedImage(null);
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
    document.body.style.overflow = 'auto';
    setIsDragging(false);
  }, []);

  const handleNextImage = useCallback(() => {
    if (filteredImages.length === 0) return;
    const nextIndex = (selectedIndex + 1) % filteredImages.length;
    setSelectedIndex(nextIndex);
    setSelectedImage(filteredImages[nextIndex]);
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  }, [selectedIndex, filteredImages]);

  const handlePrevImage = useCallback(() => {
    if (filteredImages.length === 0) return;
    const prevIndex = selectedIndex === 0 ? filteredImages.length - 1 : selectedIndex - 1;
    setSelectedIndex(prevIndex);
    setSelectedImage(filteredImages[prevIndex]);
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  }, [selectedIndex, filteredImages]);

  const handleCategoryChange = useCallback((category) => {
    if (category !== selectedCategory) {
      setSelectedCategory(category);
    }
  }, [selectedCategory]);

  const handleZoomIn = useCallback(() => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 3));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomLevel((prev) => {
      const newZoom = Math.max(prev - 0.25, 0.5);
      if (newZoom <= 1) setImagePosition({ x: 0, y: 0 });
      return newZoom;
    });
  }, []);

  // Image dragging handlers
  const handleImageMouseDown = useCallback((e) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      dragStartRef.current = {
        x: e.clientX - imagePosition.x,
        y: e.clientY - imagePosition.y,
      };
      e.preventDefault();
    }
  }, [zoomLevel, imagePosition]);

 const handleMouseMove = useCallback((e) => {
  if (isDragging && zoomLevel > 1) {
    setImagePosition((prev) => ({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    }));
  }
}, [isDragging, zoomLevel]);


  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // --- Global Event Listeners (for modal) ---

useEffect(() => {
  const handleKeyPress = (e) => {
    if (!selectedImage) return;

    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        handleCloseModal();
        break;
      case 'ArrowRight':
        e.preventDefault();
        handleNextImage();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        handlePrevImage();
        break;
      case '+':
      case '=':
        e.preventDefault();
        handleZoomIn();
        break;
      case '-':
        e.preventDefault();
        handleZoomOut();
        break;
      default:
        break;
    }
  };

  document.addEventListener('keydown', handleKeyPress);
  return () => {
    document.removeEventListener('keydown', handleKeyPress);
  };
}, [selectedImage, handleCloseModal, handleNextImage, handlePrevImage, handleZoomIn, handleZoomOut]);


  // Mouse wheel zoom
  useEffect(() => {
    const handleWheel = (e) => {
      if (selectedImage) {
        e.preventDefault(); // Crucial to prevent page scroll when zooming
        if (e.deltaY < 0) {
          handleZoomIn();
        } else {
          handleZoomOut();
        }
      }
    };

    if (selectedImage) {
      document.addEventListener('wheel', handleWheel, { passive: false });
    }

    // Cleanup function
    return () => {
      document.removeEventListener('wheel', handleWheel);
    };
  }, [selectedImage, handleZoomIn, handleZoomOut]);


  return (
    <>
      {/* Inline styles for custom scrollbar (Tailwind doesn't support this directly) */}
      <style>{`
        .gallery-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .gallery-scrollbar::-webkit-scrollbar-track {
          background: #1f2937;
        }
        .gallery-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(245, 158, 11, 0.7);
          border-radius: 10px;
          border: 2px solid #1f2937;
        }
        .gallery-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(245, 158, 11, 0.9);
          box-shadow: 0 0 8px rgba(245, 158, 11, 0.6);
        }
      `}</style>

      <section id="gallery" className="relative w-full bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-24 overflow-hidden min-h-screen">
        {/* Background glows */}
        <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
          <div className="absolute top-24 left-20 w-[28rem] h-[28rem] bg-amber-500 rounded-full blur-[140px] animate-pulse" />
          <div className="absolute bottom-24 right-16 w-[20rem] h-[20rem] bg-amber-600 rounded-full blur-[120px] animate-pulse delay-1000" />
        </div>

        {/* Heading */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center mb-16">
          <div className="inline-flex items-center mb-4">
            <span className="text-amber-400 text-sm font-bold tracking-widest uppercase px-6 py-2 border border-amber-400/40 rounded-full bg-amber-500/10">
              Visual Showcase
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-white leading-tight mb-6">
            My <span className="bg-gradient-to-r from-amber-400 to-amber-600 text-transparent bg-clip-text">Gallery</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Explore a curated collection of my artistic journey — from hyperrealistic masterpieces to digital innovations and cinematic visual narratives.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="mb-16 px-4 relative z-10">
          <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-75 ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 shadow-lg shadow-amber-500/25'
                    : 'bg-gray-800/60 text-gray-300 hover:text-white hover:bg-gray-700/50 border border-gray-700/50 hover:border-amber-400/50'
                }`}
                aria-pressed={selectedCategory === cat}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>
        </div>

       
                  {/* Gallery grid */}
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          {filteredImages.length > 0 ? (
            <VirtualizedGrid
              images={filteredImages}
              onImageClick={handleImageClick}
              columns={4}
            />
          ) : (
            <div className="text-center py-16">
              <FaImage className="text-6xl text-gray-600 mx-auto mb-4" aria-hidden="true" />
              <p className="text-gray-400 text-xl">No images found in this category</p>
            </div>
          )}
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <ImageModal
            image={selectedImage}
            index={selectedIndex}
            totalImages={filteredImages.length}
            onClose={handleCloseModal}
            onNext={handleNextImage}
            onPrev={handlePrevImage}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            zoomLevel={zoomLevel}
            imagePosition={imagePosition}
            onImageMouseDown={handleImageMouseDown}
            handleMouseMove={handleMouseMove}
            handleMouseUp={handleMouseUp}
            isDragging={isDragging}
          />
        )}
      </section>
    </>
  );
};



export default Gallery;
