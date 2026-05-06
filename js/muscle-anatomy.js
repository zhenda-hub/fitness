// ============================================
// Muscle Anatomy SVG Visualization
// ============================================

function getMuscleAnatomySVG(highlightMuscles = []) {
    // 定义肌肉颜色
    const colors = {
        primary: '#FF4D00',   // 主要肌肉 - 橙红色
        secondary: '#FF8C00', // 次要肌肉 - 橙色
        default: '#333333'    // 默认 - 深灰
    };

    // 判断肌肉是否需要高亮
    const isHighlight = (muscle) => highlightMuscles.includes(muscle);

    return `
    <svg viewBox="0 0 200 400" class="muscle-anatomy" xmlns="http://www.w3.org/2000/svg">
        <!-- Background -->
        <rect width="200" height="400" fill="transparent"/>

        <!-- Head -->
        <ellipse cx="100" cy="30" rx="20" ry="24" fill="${isHighlight('head') ? colors.primary : colors.default}" opacity="0.3"/>

        <!-- Neck -->
        <rect x="94" y="54" width="12" height="16" fill="${isHighlight('neck') ? colors.primary : colors.default}" opacity="0.3"/>

        <!-- Shoulders (Deltoids) -->
        <ellipse cx="75" cy="75" rx="14" ry="10" fill="${isHighlight('shoulders') ? colors.primary : colors.default}" opacity="0.3"/>
        <ellipse cx="125" cy="75" rx="14" ry="10" fill="${isHighlight('shoulders') ? colors.primary : colors.default}" opacity="0.3"/>

        <!-- Chest (Pectoralis) -->
        <path d="M 85 80 Q 100 95 115 80 L 115 100 Q 100 115 85 100 Z" fill="${isHighlight('chest') ? colors.primary : colors.default}" opacity="0.3"/>

        <!-- Front Abs -->
        <rect x="90" y="110" width="20" height="40" rx="4" fill="${isHighlight('abs') ? colors.primary : colors.default}" opacity="0.3"/>

        <!-- Obliques -->
        <path d="M 90 150 Q 85 170 80 185 L 90 185 Q 95 170 90 150" fill="${isHighlight('obliques') ? colors.primary : colors.default}" opacity="0.3"/>
        <path d="M 110 150 Q 115 170 120 185 L 110 185 Q 105 170 110 150" fill="${isHighlight('obliques') ? colors.primary : colors.default}" opacity="0.3"/>

        <!-- Biceps (Front view - upper arms) -->
        <ellipse cx="62" cy="100" rx="8" ry="16" fill="${isHighlight('biceps') ? colors.primary : colors.default}" opacity="0.3"/>
        <ellipse cx="138" cy="100" rx="8" ry="16" fill="${isHighlight('biceps') ? colors.primary : colors.default}" opacity="0.3"/>

        <!-- Forearms -->
        <rect x="56" y="116" width="12" height="35" rx="4" fill="${isHighlight('forearms') ? colors.secondary : colors.default}" opacity="0.3"/>
        <rect x="132" y="116" width="12" height="35" rx="4" fill="${isHighlight('forearms') ? colors.secondary : colors.default}" opacity="0.3"/>

        <!-- Hands -->
        <ellipse cx="62" cy="155" rx="7" ry="10" fill="${colors.default}" opacity="0.2"/>
        <ellipse cx="138" cy="155" rx="7" ry="10" fill="${colors.default}" opacity="0.2"/>

        <!-- Hip Flexors / Upper Thigh -->
        <rect x="82" y="185" width="14" height="25" rx="6" fill="${isHighlight('quads') ? colors.primary : colors.default}" opacity="0.3"/>
        <rect x="104" y="185" width="14" height="25" rx="6" fill="${isHighlight('quads') ? colors.primary : colors.default}" opacity="0.3"/>

        <!-- Quadriceps -->
        <rect x="80" y="210" width="18" height="70" rx="6" fill="${isHighlight('quads') ? colors.primary : colors.default}" opacity="0.3"/>
        <rect x="102" y="210" width="18" height="70" rx="6" fill="${isHighlight('quads') ? colors.primary : colors.default}" opacity="0.3"/>

        <!-- Calves -->
        <rect x="82" y="285" width="14" height="60" rx="5" fill="${isHighlight('calves') ? colors.secondary : colors.default}" opacity="0.3"/>
        <rect x="104" y="285" width="14" height="60" rx="5" fill="${isHighlight('calves') ? colors.secondary : colors.default}" opacity="0.3"/>

        <!-- Feet -->
        <ellipse cx="89" cy="350" rx="12" ry="8" fill="${colors.default}" opacity="0.2"/>
        <ellipse cx="111" cy="350" rx="12" ry="8" fill="${colors.default}" opacity="0.2"/>

        <!-- Labels for highlighted muscles -->
        ${isHighlight('chest') ? '<text x="100" y="95" text-anchor="middle" fill="#FF4D00" font-size="8" font-weight="bold">胸部</text>' : ''}
        ${isHighlight('shoulders') ? '<text x="60" y="70" fill="#FF4D00" font-size="7">肩部</text><text x="125" y="70" fill="#FF4D00" font-size="7">肩部</text>' : ''}
        ${isHighlight('biceps') ? '<text x="45" y="100" fill="#FF4D00" font-size="7">二头</text><text x="145" y="100" text-anchor="end" fill="#FF4D00" font-size="7">二头</text>' : ''}
        ${isHighlight('triceps') ? '<text x="45" y="85" fill="#FF4D00" font-size="7">三头</text><text x="155" y="85" text-anchor="end" fill="#FF4D00" font-size="7">三头</text>' : ''}
        ${isHighlight('abs') ? '<text x="100" y="135" text-anchor="middle" fill="#FF4D00" font-size="8" font-weight="bold">核心</text>' : ''}
        ${isHighlight('quads') ? '<text x="70" y="250" fill="#FF4D00" font-size="7">股四头</text><text x="130" y="250" text-anchor="end" fill="#FF4D00" font-size="7">股四头</text>' : ''}
        ${isHighlight('hamstrings') ? '<text x="65" y="240" fill="#FF8C00" font-size="7">腘绳肌</text><text x="135" y="240" text-anchor="end" fill="#FF8C00" font-size="7">腘绳肌</text>' : ''}
        ${isHighlight('glutes') ? '<text x="70" y="195" fill="#FF4D00" font-size="7">臀大肌</text><text x="130" y="195" text-anchor="end" fill="#FF4D00" font-size="7">臀大肌</text>' : ''}
        ${isHighlight('back') ? '<text x="100" y="100" text-anchor="middle" fill="#FF4D00" font-size="8" font-weight="bold">背部</text>' : ''}
        ${isHighlight('calves') ? '<text x="70" y="320" fill="#FF8C00" font-size="7">小腿</text><text x="130" y="320" text-anchor="end" fill="#FF8C00" font-size="7">小腿</text>' : ''}
    </svg>`;
}
