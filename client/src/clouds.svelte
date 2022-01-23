<script>
import { onMount } from "svelte";


    let cloud;
	if (typeof window !== 'undefined') {
		function rn(from, to) {
			return ~~(Math.random() * (to - from + 1)) + from;
		}

		function rs() {
			return arguments[rn(1, arguments.length) - 1];
		}

		function boxShadows(max) {
			let ret = [];
			for (let i = 0; i < max; ++i) {
				ret.push(`
      ${rn(1, 100)}vw ${rn(1, 100)}vh ${rn(20, 40)}vmin ${rn(1, 20)}vmin
      ${rs('#21D2C8', '#262F2F', '#141615', '#49E635')}
    `);
			}
			return ret.join(',');
		}

		function update() {
			cloud.style.boxShadow = boxShadows(100);
		}

		/*window.addEventListener('load', update);
		document.addEventListener('click', update);*/
        onMount(update);
	}
</script>

<div class="container">
	<div id="cloud" bind:this="{cloud}" ></div>
    
	<svg width="0">
		<filter id="filter">
			<feTurbulence type="fractalNoise" baseFrequency=".01" numOctaves="10" />
			<feDisplacementMap in="SourceGraphic" scale="240" />
		</filter>
	</svg>
</div>

<style>

	#cloud {
		overflow: hidden;
		width: 1px;
		height: 1px;
		transform: translate(-100%, -100%);
		border-radius: 50%;
		filter: url(#filter);
       
	}
    #filter{
        z-index: -5;
    }
    .container{
        transform: translate(0%, 100%);
        z-index: -1;
        margin-top: -22%;
        padding: 2%;
        -webkit-clip-path: polygon(-15% -15%, 115% -15%, 115% 115%, -15% 115%);
        clip-path: polygon(-15% -15%, 115% -15%, 115% 115%, -15% 115%);
    }
</style>
