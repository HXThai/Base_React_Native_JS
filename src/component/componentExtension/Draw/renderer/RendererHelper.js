import React, {useMemo} from 'react';

const RendererHelper = ({
  currentPath,
  currentColor,
  currentThickness,
  currentOpacity,
  paths,
  height,
  width,
  roundPoints,
  currentPathTolerance,
  Renderer,
}) => {
  const mergedPaths = useMemo(() => {
    return [
      ...paths,
      {
        color: currentColor,
        path: [currentPath],
        thickness: currentThickness,
        opacity: currentOpacity,
        data: [currentPath],
      },
    ];
  }, [
    currentColor,
    currentThickness,
    currentPath,
    currentOpacity,
    paths,
    currentPathTolerance,
    roundPoints,
  ]);
  return <Renderer height={height} width={width} paths={mergedPaths} />;
};

export default RendererHelper;
