
function showProcessFlow(role) {
    // Tüm süreç akışlarını gizle
    document.querySelectorAll('.process-flow').forEach(flow => {
        flow.classList.add('hidden');
    });

    // Seçilen rolün süreç akışını göster
    document.getElementById(role + 'Flow').classList.remove('hidden');

    // Tüm rol kartlarından active class'ını kaldır
    document.querySelectorAll('.role-card').forEach(card => {
        card.classList.remove('bg-primary', 'text-white');
        card.classList.add('bg-white');
        // İkon rengini düzelt
        const icon = card.querySelector('i');
        if (icon) {
            icon.classList.remove('text-white');
            icon.classList.add('text-primary');
        }
        // Metin rengini düzelt
        const texts = card.querySelectorAll('h3, span');
        texts.forEach(text => {
            text.classList.remove('text-white');
            text.classList.add('text-gray-800');
        });
    });

    // Seçilen rol kartını active yap
    const selectedCard = document.getElementById(role + 'Card');
    selectedCard.classList.remove('bg-white');
    selectedCard.classList.add('bg-primary');
    // İkon rengini değiştir
    const selectedIcon = selectedCard.querySelector('i');
    if (selectedIcon) {
        selectedIcon.classList.remove('text-primary');
        selectedIcon.classList.add('text-white');
    }
    // Metin rengini değiştir
    const selectedTexts = selectedCard.querySelectorAll('h3, span');
    selectedTexts.forEach(text => {
        text.classList.remove('text-gray-800');
        text.classList.add('text-white');
    });
}

// Sayfa yüklendiğinde müşteri sürecini göster
document.addEventListener('DOMContentLoaded', function () {
    showProcessFlow('customer');
});
