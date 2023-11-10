'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">@megrulad-ge/backend-service documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/ActivityModule.html" data-type="entity-link" >ActivityModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ActivityModule-3117f37bdeb4435305b4a7dbd5ae87c333c322bbcc6e7bd93ae8a7c8fef873472eac4ea7a2aa016b1a041601c33ee277ca58e34a830699d4dac2cb10d5954e96"' : 'data-bs-target="#xs-injectables-links-module-ActivityModule-3117f37bdeb4435305b4a7dbd5ae87c333c322bbcc6e7bd93ae8a7c8fef873472eac4ea7a2aa016b1a041601c33ee277ca58e34a830699d4dac2cb10d5954e96"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ActivityModule-3117f37bdeb4435305b4a7dbd5ae87c333c322bbcc6e7bd93ae8a7c8fef873472eac4ea7a2aa016b1a041601c33ee277ca58e34a830699d4dac2cb10d5954e96"' :
                                        'id="xs-injectables-links-module-ActivityModule-3117f37bdeb4435305b4a7dbd5ae87c333c322bbcc6e7bd93ae8a7c8fef873472eac4ea7a2aa016b1a041601c33ee277ca58e34a830699d4dac2cb10d5954e96"' }>
                                        <li class="link">
                                            <a href="injectables/ActivityService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ActivityService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ConfigModule.html" data-type="entity-link" >ConfigModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DatabaseModule.html" data-type="entity-link" >DatabaseModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DictionaryModule.html" data-type="entity-link" >DictionaryModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-DictionaryModule-8ea547202fcb9c5ef9818b3d2b601df904b6a106e1977c2775092025d83c95f5af6154208033982ef1a840d2a26b872514619b29f5401352cc109448e7d6c112"' : 'data-bs-target="#xs-controllers-links-module-DictionaryModule-8ea547202fcb9c5ef9818b3d2b601df904b6a106e1977c2775092025d83c95f5af6154208033982ef1a840d2a26b872514619b29f5401352cc109448e7d6c112"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-DictionaryModule-8ea547202fcb9c5ef9818b3d2b601df904b6a106e1977c2775092025d83c95f5af6154208033982ef1a840d2a26b872514619b29f5401352cc109448e7d6c112"' :
                                            'id="xs-controllers-links-module-DictionaryModule-8ea547202fcb9c5ef9818b3d2b601df904b6a106e1977c2775092025d83c95f5af6154208033982ef1a840d2a26b872514619b29f5401352cc109448e7d6c112"' }>
                                            <li class="link">
                                                <a href="controllers/DictionaryController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DictionaryController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-DictionaryModule-8ea547202fcb9c5ef9818b3d2b601df904b6a106e1977c2775092025d83c95f5af6154208033982ef1a840d2a26b872514619b29f5401352cc109448e7d6c112"' : 'data-bs-target="#xs-injectables-links-module-DictionaryModule-8ea547202fcb9c5ef9818b3d2b601df904b6a106e1977c2775092025d83c95f5af6154208033982ef1a840d2a26b872514619b29f5401352cc109448e7d6c112"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DictionaryModule-8ea547202fcb9c5ef9818b3d2b601df904b6a106e1977c2775092025d83c95f5af6154208033982ef1a840d2a26b872514619b29f5401352cc109448e7d6c112"' :
                                        'id="xs-injectables-links-module-DictionaryModule-8ea547202fcb9c5ef9818b3d2b601df904b6a106e1977c2775092025d83c95f5af6154208033982ef1a840d2a26b872514619b29f5401352cc109448e7d6c112"' }>
                                        <li class="link">
                                            <a href="injectables/DictionaryService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DictionaryService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/HealthModule.html" data-type="entity-link" >HealthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-HealthModule-2572c50d23ab05ceabc5336a7cacad813c192e71c5663cf9a255c58a86ea3e97e929f22bce17d5a18d34713719da671fb20b0edcddfe7b0eda96cca404eaf084"' : 'data-bs-target="#xs-controllers-links-module-HealthModule-2572c50d23ab05ceabc5336a7cacad813c192e71c5663cf9a255c58a86ea3e97e929f22bce17d5a18d34713719da671fb20b0edcddfe7b0eda96cca404eaf084"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-HealthModule-2572c50d23ab05ceabc5336a7cacad813c192e71c5663cf9a255c58a86ea3e97e929f22bce17d5a18d34713719da671fb20b0edcddfe7b0eda96cca404eaf084"' :
                                            'id="xs-controllers-links-module-HealthModule-2572c50d23ab05ceabc5336a7cacad813c192e71c5663cf9a255c58a86ea3e97e929f22bce17d5a18d34713719da671fb20b0edcddfe7b0eda96cca404eaf084"' }>
                                            <li class="link">
                                                <a href="controllers/HealthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HealthController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RequestModule.html" data-type="entity-link" >RequestModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SearchModule.html" data-type="entity-link" >SearchModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-SearchModule-209c7cc46e27a3adb7eca7810811c26f3bcf85f281f2773a7eb61a28682d0ff269e8ce3294a9d316899ad7ce08c8d00ec943d12524583dd92c3e591c5f976a66"' : 'data-bs-target="#xs-controllers-links-module-SearchModule-209c7cc46e27a3adb7eca7810811c26f3bcf85f281f2773a7eb61a28682d0ff269e8ce3294a9d316899ad7ce08c8d00ec943d12524583dd92c3e591c5f976a66"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SearchModule-209c7cc46e27a3adb7eca7810811c26f3bcf85f281f2773a7eb61a28682d0ff269e8ce3294a9d316899ad7ce08c8d00ec943d12524583dd92c3e591c5f976a66"' :
                                            'id="xs-controllers-links-module-SearchModule-209c7cc46e27a3adb7eca7810811c26f3bcf85f281f2773a7eb61a28682d0ff269e8ce3294a9d316899ad7ce08c8d00ec943d12524583dd92c3e591c5f976a66"' }>
                                            <li class="link">
                                                <a href="controllers/SearchController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SearchController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SeederModule.html" data-type="entity-link" >SeederModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SeederModule-123e08eaf7c497418279699d36c87fccc24df2232aa13599899bbe208a718687c4384d4f751e3db5e68bc9cf250f46c2152716f54d77b73eb1ee0a09635bfd9f"' : 'data-bs-target="#xs-injectables-links-module-SeederModule-123e08eaf7c497418279699d36c87fccc24df2232aa13599899bbe208a718687c4384d4f751e3db5e68bc9cf250f46c2152716f54d77b73eb1ee0a09635bfd9f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SeederModule-123e08eaf7c497418279699d36c87fccc24df2232aa13599899bbe208a718687c4384d4f751e3db5e68bc9cf250f46c2152716f54d77b73eb1ee0a09635bfd9f"' :
                                        'id="xs-injectables-links-module-SeederModule-123e08eaf7c497418279699d36c87fccc24df2232aa13599899bbe208a718687c4384d4f751e3db5e68bc9cf250f46c2152716f54d77b73eb1ee0a09635bfd9f"' }>
                                        <li class="link">
                                            <a href="injectables/AddDefaultValuesForDevelopment.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddDefaultValuesForDevelopment</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SeederService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SeederService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SetupModule.html" data-type="entity-link" >SetupModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/TranslationModule.html" data-type="entity-link" >TranslationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TranslationModule-333df44625dc765f7c544483f6527538d5534087ed1712e92a3595746cab2d9364cd6e2aa547628e39a51d5362b22c6552cf5d495917f83ac55433b5edc8e18e"' : 'data-bs-target="#xs-controllers-links-module-TranslationModule-333df44625dc765f7c544483f6527538d5534087ed1712e92a3595746cab2d9364cd6e2aa547628e39a51d5362b22c6552cf5d495917f83ac55433b5edc8e18e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TranslationModule-333df44625dc765f7c544483f6527538d5534087ed1712e92a3595746cab2d9364cd6e2aa547628e39a51d5362b22c6552cf5d495917f83ac55433b5edc8e18e"' :
                                            'id="xs-controllers-links-module-TranslationModule-333df44625dc765f7c544483f6527538d5534087ed1712e92a3595746cab2d9364cd6e2aa547628e39a51d5362b22c6552cf5d495917f83ac55433b5edc8e18e"' }>
                                            <li class="link">
                                                <a href="controllers/TranslationController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TranslationController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TranslationModule-333df44625dc765f7c544483f6527538d5534087ed1712e92a3595746cab2d9364cd6e2aa547628e39a51d5362b22c6552cf5d495917f83ac55433b5edc8e18e"' : 'data-bs-target="#xs-injectables-links-module-TranslationModule-333df44625dc765f7c544483f6527538d5534087ed1712e92a3595746cab2d9364cd6e2aa547628e39a51d5362b22c6552cf5d495917f83ac55433b5edc8e18e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TranslationModule-333df44625dc765f7c544483f6527538d5534087ed1712e92a3595746cab2d9364cd6e2aa547628e39a51d5362b22c6552cf5d495917f83ac55433b5edc8e18e"' :
                                        'id="xs-injectables-links-module-TranslationModule-333df44625dc765f7c544483f6527538d5534087ed1712e92a3595746cab2d9364cd6e2aa547628e39a51d5362b22c6552cf5d495917f83ac55433b5edc8e18e"' }>
                                        <li class="link">
                                            <a href="injectables/TranslationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TranslationService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Activity.html" data-type="entity-link" >Activity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Dictionary.html" data-type="entity-link" >Dictionary</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Seed.html" data-type="entity-link" >Seed</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Translation.html" data-type="entity-link" >Translation</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CorsException.html" data-type="entity-link" >CorsException</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateDictionaryRequest.html" data-type="entity-link" >CreateDictionaryRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateDictionaryResponse.html" data-type="entity-link" >CreateDictionaryResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTranslationRequest.html" data-type="entity-link" >CreateTranslationRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTranslationRequestParam.html" data-type="entity-link" >CreateTranslationRequestParam</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTranslationResponse.html" data-type="entity-link" >CreateTranslationResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteDictionaryRequestParam.html" data-type="entity-link" >DeleteDictionaryRequestParam</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteTranslationRequestParam.html" data-type="entity-link" >DeleteTranslationRequestParam</a>
                            </li>
                            <li class="link">
                                <a href="classes/Dictionary.html" data-type="entity-link" >Dictionary</a>
                            </li>
                            <li class="link">
                                <a href="classes/EntityException.html" data-type="entity-link" >EntityException</a>
                            </li>
                            <li class="link">
                                <a href="classes/Env.html" data-type="entity-link" >Env</a>
                            </li>
                            <li class="link">
                                <a href="classes/ErrorResponse.html" data-type="entity-link" >ErrorResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/FetchDictionaryRequestParam.html" data-type="entity-link" >FetchDictionaryRequestParam</a>
                            </li>
                            <li class="link">
                                <a href="classes/FetchDictionaryResponse.html" data-type="entity-link" >FetchDictionaryResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/FetchTranslationResponse.html" data-type="entity-link" >FetchTranslationResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/HttpExceptionsFilter.html" data-type="entity-link" >HttpExceptionsFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/SearchDictionaryRequestParam.html" data-type="entity-link" >SearchDictionaryRequestParam</a>
                            </li>
                            <li class="link">
                                <a href="classes/TimestampsEntity.html" data-type="entity-link" >TimestampsEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/Translation.html" data-type="entity-link" >Translation</a>
                            </li>
                            <li class="link">
                                <a href="classes/TranslationProperty.html" data-type="entity-link" >TranslationProperty</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateDictionaryRequest.html" data-type="entity-link" >UpdateDictionaryRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateDictionaryRequestParam.html" data-type="entity-link" >UpdateDictionaryRequestParam</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTranslationRequest.html" data-type="entity-link" >UpdateTranslationRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTranslationRequestParam.html" data-type="entity-link" >UpdateTranslationRequestParam</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ExceptionInterceptor.html" data-type="entity-link" >ExceptionInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RequestInterceptor.html" data-type="entity-link" >RequestInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RequestService.html" data-type="entity-link" >RequestService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/Seeds.html" data-type="entity-link" >Seeds</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/DictionaryCreated.html" data-type="entity-link" >DictionaryCreated</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DictionaryDeleted.html" data-type="entity-link" >DictionaryDeleted</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DictionaryUpdated.html" data-type="entity-link" >DictionaryUpdated</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TimestampsInterface.html" data-type="entity-link" >TimestampsInterface</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});