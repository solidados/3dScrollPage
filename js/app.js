//3D scroll
// Задаю переменную zSpacing параметры которой отвечают за растояние по оси-z (допустим от текста до фотографии)
let zSpacing = -1000,
    // теперь устанавливаю стартовую позицию, где после обновления страницы все элементы принимают своё начальное положение на ней
    lastPos = zSpacing / 5,
    // Следующее, что необходимо сделать для большого количества frames, где каждый слой – это frame, и для того, чтобы рздать позицию для каждого frame по оси-z, необходимо будет пройти по нему циклом
    $frames = document.getElementsByClassName('frame'),
    frames = Array.from($frames),
    zVals = []

window.onscroll = function() {

    let top = document.documentElement.scrollTop,
        delta = lastPos - top

    lastPos = top
        // при scroll пройдусь по всем frames. То есть frame – это массив, с добавлением функциии со следующим параметрами: n – это текущий обрабатываемый элемент, а i – это индекс текузего обрабатываемого элемента. 
        // Что происходит? – во время scroll user проходит по всем frames, издесь уже подключается пустой массив zVals, созданный за пределами функции onScroll, в который пушатся обновлённые значения.
        // Кроме того, что i умножается на переменную zSpacing, к ней ещё прибавлется сама переменная, чтобы было какое-то пространство до первого кадра.
        // И с учётом delta, работа уже идёт с каждым элементом по индексу. В этом случае индекс = -5. При помощи него можно будет управлять скоростью пролистывания.
    frames.forEach(function(n, i) {
        zVals.push((i * zSpacing) + zSpacing)
        zVals[i] += delta * -5.5
        let frame = frames[i],
            transform = `translateZ(${zVals[i]}px)`
        opacity = zVals[i] < Math.abs(zSpacing) / 1.8 ? 1 : 0
        frame.setAttribute('style', `transform: ${transform}; opacity: ${opacity}`)

    })

}

window.scrollTo(0, 1)

// Audio – всё, что касается "сигналов звукового сопровождения программы Орбита-2 Центрального Телевидения"

let soundButton = document.querySelector('.soundbutton'),
    audio = document.querySelector('.audio')

soundButton.addEventListener('click', e => {
    soundButton.classList.toggle('paused')
    audio.paused ? audio.play() : audio.paused()
})

window.onfocus = function() {
    soundButton.classList.contains('paused') ? audio.pause() : audio.play()
}

window.onblur = function() {
    audio.pause()
}