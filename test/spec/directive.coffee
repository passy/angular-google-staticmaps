describe 'angular-google-staticmaps', ->

  controllerProvider = null
  scope = null

  beforeEach module('wu.staticGmap')
  beforeEach module((_$controllerProvider_) ->
    controllerProvider = _$controllerProvider_
    null
  )

  beforeEach inject(($rootScope) =>
    @scope = $rootScope.$new()
    null
  )

  describe 'static-gmap directive', =>

    it 'should initialize', inject(($compile) =>
      element = angular.element '<static-gmap size="10x10" sensor=false></static-gmap>'
      element = $compile(element)(@scope)
    )

    it 'extract the size', inject(($compile) =>
      element = angular.element '<static-gmap size="10x10" sensor=true></static-gmap>'
      element = $compile(element)(@scope)

      expect(element.attr('height')).toBe '10'
      expect(element.attr('width')).toBe '10'
    )

    it 'should output an image', inject(($compile) =>
      @scope.markers = [{
        color: 'blue'
        label: 'S'
        coords: [53.556195, 9.9905748]
      }]

      element = angular.element '''
        <static-gmap markers="markers" zoom="14" size="137x137" sensor="false">
        </static-gmap>
      '''
      element = $compile(element)(@scope)
      expect(element.attr('src')).toBe '//maps.googleapis.com/maps/api/staticmap?markers=color%3Ablue%7Clabel%3AS%7C53.556195%2C9.9905748&zoom=14&size=137x137&sensor=false'
    )

    it 'should output an image for a markers literal', inject(($compile) =>
      element = angular.element '''
        <static-gmap markers="{ coords: [10, 20] }" size="137x137" sensor="false">
        </static-gmap>
      '''
      element = $compile(element)(@scope)
      expect(element.attr('src')).toBe '//maps.googleapis.com/maps/api/staticmap?markers=10%2C20&size=137x137&sensor=false'
    )

  describe 'static-gmap controller', ->
    beforeEach(inject(($controller) =>
      @ctrl = $controller 'StaticGmapCtrl'
    ))

    it 'should build a string for markers', =>

      result = @ctrl.makeMarkerStrings([{
        color: 'red'
        label: 'X'
        coords: [3.14, 4.28]
      }, {
        color: 'yellow'
        label: 'Y'
        coords: [10, 20]
      }])

      expect(result.length).toBe 2
      expect(result[0]).toBe 'color:red|label:X|3.14,4.28'
      expect(result[1]).toBe 'color:yellow|label:Y|10,20'
